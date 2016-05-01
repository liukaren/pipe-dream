import React from 'react'
import cn from 'classnames'

import { GAME_STATES, PLACE_THROTTLE_MS, SWAP_THROTTLE_MS } from 'constants'
import { Tiles } from 'tiles'
import TileHelper from 'tileHelper'
import Board from 'components/Board'
import GameOver from 'components/GameOver'
import GameStart from 'components/GameStart'
import Queue from 'components/Queue'
import Rules from 'components/Rules'
import styles from './styles.less'

const TILE_SCORE = 50

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
            gameState: GAME_STATES.START_SCREEN,
            gooPosition: null,
            isReplacingTile: false,
            level: 0,
            score: 0
        }
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

        const levelInfo = LEVELS[this.state.level]
        setTimeout(() => {
            this.onStep()
            this.stepIntervalId = setInterval(this.onStep, levelInfo.flowSpeedMs)
        }, levelInfo.startDelayMs)
    },

    showRules() {
        this.setState({ gameState: GAME_STATES.RULES_SCREEN })
    },

    endLevel() {
        clearInterval(this.stepIntervalId)
        this.stepIntervalId = null
        if (this.state.score < LEVELS[this.state.level].targetScore) {
            this.setState({
                gameState: GAME_STATES.GAME_OVER_SCREEN,
                canPlaceTile: false
            })
        } else if (this.state.level < LEVELS.length - 1) {
            this.setState({ gameState: GAME_STATES.NEXT_LEVEL_SCREEN })
        } else {
            this.setState({ gameState: GAME_STATES.WIN_SCREEN })
        }
    },

    onNextClick() {
        this.startLevel(this.state.level + 1)
    },

    onTileClick(row, col) {
        if (!this.state.canPlaceTile) { return }

        const board = this.state.board
        const isReplacingTile = board[row][col].type !== Tiles.EMPTY
        board[row][col] = this.state.queue.shift()
        this.state.queue.push(TileHelper.generateRandomTile())
        this.setState({
            board,
            queue: this.state.queue,
            canPlaceTile: false,
            isReplacingTile
        })

        // Play a sound
        isReplacingTile ? this.soundSwap.play() : this.soundPlace.play()

        // After a delay, allow placing a tile again. Replacing a tile takes
        // more time than placing down a new tile.
        const throttle = isReplacingTile ? SWAP_THROTTLE_MS : PLACE_THROTTLE_MS
        setTimeout(() => this.setState({
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

    getOverlay() {
        switch(this.state.gameState) {
            case GAME_STATES.START_SCREEN:
                return <GameStart onStartClick={ () => { this.startLevel(0) } }
                                  onRulesClick={ this.showRules } />
            case GAME_STATES.RULES_SCREEN:
                return <Rules />
            case GAME_STATES.NEXT_LEVEL_SCREEN:
                return <div>
                    next level!
                    <button onClick={ this.onNextClick }>next</button>
                </div>
            case GAME_STATES.GAME_OVER_SCREEN:
                return <GameOver onRestartClick={ this.restartGame } />
            case GAME_STATES.WIN_SCREEN:
                return <div>you won!!</div>
            default:
                return null
        }
    },

    render() {
        const levelInfo = LEVELS[this.state.level]
        const overlay = this.getOverlay()

        return <div className={ styles.main }>
            <div className={ cn(styles.row, styles.titleRow) }>
                <div className={ styles.leftTitle }>
                    <img src="../../../public/images/next.svg"
                         className={ styles.svgLabel } />
                </div>
                <div className={ styles.rightTitle }>
                    Target Score: { levelInfo.targetScore }
                    <span className={ styles.score }>{ this.state.score }</span>
                    <img src="../../../public/images/score.svg"
                         className={ styles.svgLabel } />
                </div>
            </div>

            <div className={ styles.row }>
                <div className={ styles.queue }>
                    <Queue tiles={ this.state.queue } />
                </div>
                <div className={ styles.spacer }></div>
                <div className={ styles.board }>
                    { overlay && <div className={ styles.overlay }>{ overlay }</div> }
                    <Board board={ this.state.board }
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
