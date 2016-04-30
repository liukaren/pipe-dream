import React from 'react'
import cn from 'classnames'

import { GAME_STATES, PLACE_THROTTLE_MS, SWAP_THROTTLE_MS } from 'constants'
import { Tiles } from 'tiles'
import TileHelper from 'tileHelper'
import Board from 'components/Board'
import GameOver from 'components/GameOver'
import GameStart from 'components/GameStart'
import Queue from 'components/Queue'
import styles from './styles.less'

const TILE_SCORE = 50

// TODO: These should be variable
const START_DELAY_MS = 10000
const FLOW_SPEED_MS = 5000

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
            score: 0
        }
    },

    restartGame() {
        this.setState(this.getInitialState())
    },

    startGame() {
        const board = this.state.board
        const startTile = TileHelper.generateRandomStartTile()
        const { row, col } = TileHelper.generateRandomInnerPosition()

        board[row][col] = startTile

        this.setState({
            board,
            queue: TileHelper.generateQueue(),
            canPlaceTile: true,
            gameState: GAME_STATES.FLOW_NOT_STARTED,
            startPosition: { row, col }
        })

        setTimeout(() => {
            this.onStep()
            this.stepIntervalId = setInterval(this.onStep, FLOW_SPEED_MS)
        }, START_DELAY_MS)
    },

    endGame() {
        clearInterval(this.stepIntervalId)
        this.stepIntervalId = null
        this.setState({
            gameState: GAME_STATES.GAME_OVER_SCREEN,
            canPlaceTile: false
        })
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
            this.endGame()
            return
        }

        // Check if next position has an opening where the goo would enter
        const nextGooTile = this.state.board[nextGooPosition.row][nextGooPosition.col].type
        const enterDirection = TileHelper.getOppositeDirection(exitDirection)
        if (nextGooTile.openings.indexOf(enterDirection) === -1) {
            this.endGame()
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

    render() {
        return <div className={ styles.main }>
            <div className={ cn(styles.row, styles.titleRow) }>
                <div className={ styles.leftTitle }>
                    <img src="../../../public/images/next.svg"
                         className={ styles.svgLabel } />
                </div>
                <div className={ styles.rightTitle }>
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
                    { this.state.gameState === GAME_STATES.START_SCREEN &&
                        <div className={ styles.overlay }>
                            <GameStart onStartClick={ this.startGame } />
                        </div> }
                    { this.state.gameState === GAME_STATES.GAME_OVER_SCREEN &&
                        <div className={ styles.overlay }>
                            <GameOver onRestartClick={ this.restartGame } />
                        </div> }
                    <Board board={ this.state.board }
                           flowSpeedMs={ FLOW_SPEED_MS }
                           isReplacingTile={ this.state.isReplacingTile }
                           onTileClick={ this.onTileClick }
                           nextTile={ this.state.queue[0] }
                           startDelayMs={ START_DELAY_MS } />
                </div>
            </div>
        </div>
    }
})
