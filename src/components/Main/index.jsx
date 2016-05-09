import React from 'react'
import cn from 'classnames'

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
const TILE_SCORE_FAST = 70
const UNUSED_TILE_PENALTY = 3

const KEYCODE_SPACE = 32
const FAST_FLOW_SPEED_MS = 400
const MOBILE_BREAKPOINT = 500

const LEVELS = [{
    startDelayMs: 20000,
    flowSpeedMs: 3000,
    targetScore: 250
}, {
    startDelayMs: 18000,
    flowSpeedMs: 2500,
    targetScore: 400
}, {
    startDelayMs: 15000,
    flowSpeedMs: 2000,
    targetScore: 500
}, {
    startDelayMs: 10000,
    flowSpeedMs: 1500,
    targetScore: 600
}]

export default React.createClass({
    componentDidMount() {
        this.soundPlace = document.getElementById('sound-place')
        this.soundSwap = document.getElementById('sound-swap')
        document.onkeypress = this.onKeyPress
        this.detectRotate() // Call once at the beginning
        window.addEventListener('resize', this.detectRotate)
    },

    componentWillUnmount() {
        document.onkeypress = null
        window.removeEventListener('resize', this.detectRotate)
    },

    getInitialState() {
        return {
            board: TileHelper.generateEmptyBoard(),
            queue: TileHelper.generateEmptyQueue(),
            canPlaceTile: false,
            gameState: GAME_STATES.SCREEN_START,
            gooPosition: null,
            hasAudio: true,
            isReplacingTile: false,
            level: 0,
            score: 0
        }
    },

    playSound(sound) {
        if (this.state.hasAudio) {
            sound.currentTime = 0
            sound.play()
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
            score: 0,
            startPosition: { row, col }
        })

        const levelInfo = this.currentLevel()
        this._startDelayTimeoutId = setTimeout(() => {
            this._startDelayTimeoutId = null

            this.onStep()
            this.setState({ gameState: GAME_STATES.FLOW_STARTED })
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
                score: Math.max(this.state.score - UNUSED_TILE_PENALTY, 0)
            })
            this.playSound(this.soundSwap)
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
        this.playSound(isReplacingTile ? this.soundSwap : this.soundPlace)

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
                board: this.state.board
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

        const scoreAdded = this.state.gameState === GAME_STATES.FLOW_FAST ?
            TILE_SCORE_FAST : TILE_SCORE
        this.setState({
            gooPosition: nextGooPosition,
            score: this.state.score + scoreAdded
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
                                   level={ this.state.level + 2 }
                                   score={ this.state.score } />
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

    onKeyPress(event) {
        // On spacebar, speed up the flow.
        if (event.key === ' ' || event.which === KEYCODE_SPACE) {
            if (this.state.gameState === GAME_STATES.FLOW_NOT_STARTED) {
                clearTimeout(this._startDelayTimeoutId)
                this._startDelayTimeoutId = null

                this.setState({ gameState: GAME_STATES.FLOW_FAST })
                this._stepIntervalId = setInterval(this.onStep, FAST_FLOW_SPEED_MS)
            }
            if (this.state.gameState === GAME_STATES.FLOW_STARTED) {
                clearInterval(this._stepIntervalId)

                this.setState({ gameState: GAME_STATES.FLOW_FAST })
                this._stepIntervalId = setInterval(this.onStep, FAST_FLOW_SPEED_MS)
            }
        }
    },

    detectRotate() {
        const showRotatePrompt = window.innerWidth < MOBILE_BREAKPOINT &&
            window.innerHeight > window.innerWidth
        this.setState({ showRotatePrompt })
    },

    onToggleAudio() {
         this.setState({ hasAudio: !this.state.hasAudio })
    },

    render() {
        const levelInfo = this.currentLevel()
        const screen = this.getScreen()

        const isFastMode = this.state.gameState === GAME_STATES.FLOW_FAST
        const startDelayMs = isFastMode ? 0 : levelInfo.startDelayMs
        const flowSpeedMs = isFastMode ? FAST_FLOW_SPEED_MS : levelInfo.flowSpeedMs

        if (this.state.showRotatePrompt) {
            return <div className={ cn(styles.main, styles.rotatePrompt) }>
                This game is best viewed with your device held sideways!
            </div>
        }

        return <div className={ styles.main }>
            <div className={ styles.row }>
                <div className={ styles.queue }>
                    <p>Next</p>
                    <Queue tiles={ this.state.queue } />
                    <div className={ styles.audioToggle }
                         onClick={ this.onToggleAudio }>
                        <img src="public/images/audio.svg"
                             className={ styles.audioIcon } />&nbsp;
                        <img src="public/images/audio-on.svg"
                             className={ styles.audioIcon }
                             style={{ visibility: (this.state.hasAudio ? 'visible' : 'hidden') }} />
                    </div>
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
                           flowSpeedMs={ flowSpeedMs }
                           isReplacingTile={ this.state.isReplacingTile }
                           onTileClick={ this.onTileClick }
                           nextTile={ this.state.queue[0] }
                           startDelayMs={ startDelayMs } />
                </div>
            </div>
        </div>
    }
})
