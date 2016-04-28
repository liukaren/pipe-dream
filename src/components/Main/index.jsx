import React from 'react'

import { PLACE_THROTTLE_MS, SWAP_THROTTLE_MS } from 'constants'
import { Tiles } from 'tiles'
import TileHelper from 'tileHelper'
import Board from 'components/Board'
import GameOver from 'components/GameOver'
import GameStart from 'components/GameStart'
import Queue from 'components/Queue'
import styles from './styles.less'

const TILE_SCORE = 50

export default React.createClass({
    getInitialState() {
        return {
            board: TileHelper.generateEmptyBoard(),
            queue: TileHelper.generateEmptyQueue(),
            canPlaceTile: false,
            gooPosition: null,
            isGameStarted: false,
            isGameOver: false,
            isReplacingTile: false,
            score: 0
        }
    },

    startGame() {
        const board = TileHelper.generateEmptyBoard()
        const startTile = TileHelper.generateRandomStartTile()
        const { row, col } = TileHelper.generateRandomInnerPosition()

        board[row][col] = startTile

        this.setState({
            board,
            queue: TileHelper.generateQueue(),
            canPlaceTile: true,
            gooPosition: null,
            isGameStarted: true,
            isGameOver: false,
            score: 0,
            startPosition: { row, col }
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
            this.setState({ gooPosition, board: this.state.board })
            return
        }

        // Flow to the next position
        const { row, col, exitDirection } = this.state.gooPosition
        const nextGooPosition = TileHelper.getNextPosition(row, col, exitDirection)

        // Check if the next position is on the board
        if (TileHelper.isOutOfBounds(nextGooPosition.row, nextGooPosition.col)) {
            console.log('game over, out of bounds')
            this.setState({ isGameOver: true })
            return
        }

        // Check if next position has an opening where the goo would enter
        const nextGooTile = this.state.board[nextGooPosition.row][nextGooPosition.col].type
        const enterDirection = TileHelper.getOppositeDirection(exitDirection)
        if (nextGooTile.openings.indexOf(enterDirection) === -1) {
            console.log('game over, next tile does not have opening')
            this.setState({ isGameOver: true })
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
        return <div className={ styles.verticalMain }>
            <div className={ styles.horizontalMain }>
                <div className={ styles.queue }>
                    <Queue tiles={ this.state.queue } />
                </div>
                <div className={ styles.board }>
                    <div className={ styles.score }>
                        { this.state.score }
                        <img src="../../../public/images/score.svg"
                             className={ styles.scoreLabel } />
                        <button onClick={ this.onStep }>Next</button>
                    </div>
                    { !this.state.isGameStarted &&
                        <div className={ styles.overlay }>
                            <GameStart onStartClick={ this.startGame } />
                        </div> }
                    { this.state.isGameOver &&
                        <div className={ styles.overlay }>
                            <GameOver onRestartClick={ this.startGame } />
                        </div> }
                    <Board board={ this.state.board }
                           isReplacingTile={ this.state.isReplacingTile }
                           onTileClick={ this.onTileClick }
                           nextTile={ this.state.queue[0] } />
                </div>
            </div>
        </div>
    }
})
