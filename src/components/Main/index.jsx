import React from 'react'

import { GAME_STATES, BOOM_MS, PLACE_THROTTLE_MS, SWAP_THROTTLE_MS } from 'constants'
import { Tiles } from 'tiles'
import TileHelper from 'tileHelper'
import Board from 'components/Board'
import Queue from 'components/Queue'
import Rules from 'components/Rules'
import ScreenLose from 'components/Screens/lose'
import ScreenNext from 'components/Screens/next'
import ScreenStart from 'components/Screens/start'
import ScreenWin from 'components/Screens/win'
import styles from './styles.less'

const TILE_SCORE = 50
const UNUSED_TILE_PENALTY = 10

const LEVELS = [{
    startDelayMs: 2000,
    flowSpeedMs: 1000,
    targetScore: 50
}, {
    startDelayMs: 1000,
    flowSpeedMs: 1000,
    targetScore: 100
}]

export default React.createClass({
    componentDidMount() {
        this.soundPlace = document.getElementById('sound-place')
        this.soundSwap = document.getElementById('sound-swap')
    },

    getInitialState() {
        return {
            board: TileHelper.generateEmptyBoard(),
            queue: TileHelper.generateEmptyQueue(),
            canPlaceTile: false,
            gameState: GAME_STATES.SCREEN_START,
            gooPosition: null,
            isReplacingTile: false,
            level: 0,
            score: 0
        }
    },

    currentLevel() {
        return LEVELS[this.state.level]
    },

    restartGame() {
        this.setState(this.getInitialState())
    },

    startLevel(level) {
        const board = TileHelper.generateEmptyBoard()
        const startTile = TileHelper.generateRandomStartTile()
        const { row, col } = TileHelper.generateRandomInnerPosition()

        board[row][col] = startTile

        this.setState({
            board,
            queue: TileHelper.generateQueue(),
            canPlaceTile: true,
            gameState: GAME_STATES.FLOW_NOT_STARTED,
            gooPosition: null,
            isReplacingTile: false,
            level: level,
            startPosition: { row, col }
        })

        const levelInfo = this.currentLevel()
        setTimeout(() => {
            this.onStep()
            this._stepIntervalId = setInterval(this.onStep, levelInfo.flowSpeedMs)
        }, levelInfo.startDelayMs)
    },

    showRules() {
        this.setState({ gameState: GAME_STATES.SCREEN_RULES })
    },

    hideRules() {
        this.setState({ gameState: GAME_STATES.SCREEN_START })
    },

    // A recursive helper method that explodes all unused tiles one by one.
    clearUnusedTile(resolve, row, col) {
        if (row >= this.state.board.length) { // Finished with the board
            return resolve()
        }
        if (col >= this.state.board[0].length) { // Ready for the next row
            return this.clearUnusedTile(resolve, row + 1, 0)
        }

        const tile = this.state.board[row][col]
        if (tile.gooDirections.length === 0 && tile.type !== Tiles.EMPTY) {
            this.state.board[row][col] = TileHelper.initTileWithType(Tiles.EMPTY)
            this.setState({
                board: this.state.board,
                isReplacingTile: true,
                score: this.state.score - UNUSED_TILE_PENALTY
            })
            this.soundSwap.currentTime = 0
            this.soundSwap.play()
            setTimeout(() => { this.clearUnusedTile(resolve, row, col + 1) }, BOOM_MS)
            return
        } else {
            return this.clearUnusedTile(resolve, row, col + 1)
        }
    },

    clearUnusedTiles() {
        return new Promise((resolve) => this.clearUnusedTile(resolve, 0, 0))
    },

    endLevel() {
        clearInterval(this._stepIntervalId)
        this._stepIntervalId = null
        clearTimeout(this._tileClickTimeoutId)
        this._tileClickTimeoutId = null

        this.setState({ canPlaceTile: false })
        this.clearUnusedTiles().then(() => {
            if (this.state.score < this.currentLevel().targetScore) {
                this.setState({ gameState: GAME_STATES.SCREEN_LOSE })
            } else if (this.state.level < LEVELS.length - 1) {
                this.setState({ gameState: GAME_STATES.SCREEN_NEXT })
            } else {
                this.setState({ gameState: GAME_STATES.SCREEN_WIN })
            }
        })
    },

    onNextClick() {
        this.startLevel(this.state.level + 1)
    },

    onTileClick(row, col) {
        const board = this.state.board
        const isReplacingTile = board[row][col].type !== Tiles.EMPTY
        board[row][col] = this.state.queue.shift()
        this.setState({
            board,
            queue: this.state.queue.concat([TileHelper.generateRandomTile()]),
            canPlaceTile: false,
            isReplacingTile
        })

        // Play a sound
        if (isReplacingTile) {
            this.soundSwap.currentTime = 0
            this.soundSwap.play()
        } else {
            this.soundPlace.currentTime = 0
            this.soundPlace.play()
        }

        // After a delay, allow placing a tile again. Replacing a tile takes
        // more time than placing down a new tile.
        const throttle = isReplacingTile ? SWAP_THROTTLE_MS : PLACE_THROTTLE_MS
        this._tileClickTimeoutId = setTimeout(() => this.setState({
            canPlaceTile: true,
            isReplacingTile: false
        }), throttle)
    },

    onStep() {
        // If no goo yet, initialize goo position to the start tile.
        if (!this.state.gooPosition) {
            const { row, col } = this.state.startPosition
            const startTile = this.state.board[row][col]
            const exitDirection = startTile.type.openings[0]
            const enterDirection = TileHelper.getOppositeDirection(exitDirection)
            const gooPosition = { row, col, exitDirection }
            this.state.board[row][col].gooDirections = [[enterDirection, exitDirection]]
            this.setState({
                gooPosition,
                board: this.state.board,
                gameState: GAME_STATES.FLOW_STARTED
            })
            return
        }

        // Flow to the next position
        const { row, col, exitDirection } = this.state.gooPosition
        const nextGooPosition = TileHelper.getNextPosition(row, col, exitDirection)

        // Check if the next position is on the board
        if (TileHelper.isOutOfBounds(nextGooPosition.row, nextGooPosition.col)) {
            this.endLevel()
            return
        }

        // Check if next position has an opening where the goo would enter
        const nextGooTile = this.state.board[nextGooPosition.row][nextGooPosition.col].type
        const enterDirection = TileHelper.getOppositeDirection(exitDirection)
        if (nextGooTile.openings.indexOf(enterDirection) === -1) {
            this.endLevel()
            return
        }

        // Set the next exit direction
        nextGooPosition.exitDirection = TileHelper.getExitDirection(nextGooTile, enterDirection)

        // Fill the next position with goo
        this.state.board[nextGooPosition.row][nextGooPosition.col].gooDirections.push(
            [enterDirection, nextGooPosition.exitDirection]
        )

        this.setState({
            gooPosition: nextGooPosition,
            score: this.state.score + TILE_SCORE
        })
    },

    getScreen() {
        switch(this.state.gameState) {
            case GAME_STATES.SCREEN_START:
                return <ScreenStart onStartClick={ () => { this.startLevel(0) } }
                                    onRulesClick={ this.showRules } />
            case GAME_STATES.SCREEN_RULES:
                return <Rules onExit={ this.hideRules } />
            case GAME_STATES.SCREEN_NEXT:
                return <ScreenNext onNextClick={ this.onNextClick }
                                   level={ this.state.level + 2 } />
            case GAME_STATES.SCREEN_LOSE:
                return <ScreenLose onRestartClick={ this.restartGame }
                                   score={ this.state.score }
                                   targetScore={ this.currentLevel().targetScore } />
            case GAME_STATES.SCREEN_WIN:
                return <ScreenWin onRestartClick={ this.restartGame }
                                  score={ this.state.score } />
            default:
                return null
        }
    },

    render() {
        const levelInfo = this.currentLevel()
        const screen = this.getScreen()

        return <div className={ styles.main }>
            <div className={ styles.row }>
                <div className={ styles.queue }>
                    <p>Next</p>
                    <Queue tiles={ this.state.queue } />
                </div>
                <div className={ styles.spacer }></div>
                <div className={ styles.board }>
                    <div className={ styles.scoreRow }>
                        <p className={ styles.scoreCol }>
                            Target Score: { levelInfo.targetScore }
                        </p>
                        <p className={ styles.scoreCol }>
                            Score: { this.state.score }
                        </p>
                    </div>
                    { screen && <div className={ styles.screen } key="screen">
                        <div className={ styles.splat }>
                            { screen }
                        </div>
                    </div> }
                    <Board board={ this.state.board }
                           canPlaceTile={ this.state.canPlaceTile }
                           flowSpeedMs={ levelInfo.flowSpeedMs }
                           isReplacingTile={ this.state.isReplacingTile }
                           onTileClick={ this.onTileClick }
                           nextTile={ this.state.queue[0] }
                           startDelayMs={ levelInfo.startDelayMs } />
                </div>
            </div>
        </div>
    }
})
