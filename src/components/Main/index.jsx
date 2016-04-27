import React from 'react'

import { Tiles } from 'tiles'
import TileHelper from 'tileHelper'
import Board from 'components/Board'
import GameOver from 'components/GameOver'
import Queue from 'components/Queue'
import styles from './styles.less'

const PLACE_THROTTLE_MS = 300 // How often the user can place new tiles
const SWAP_THROTTLE_MS = 1000 // How often the user can swap existing tiles
const TILE_SCORE = 50

export default React.createClass({
    getInitialState() {
        const board = TileHelper.generateEmptyBoard()
        const startTile = TileHelper.generateRandomStartTile()
        const { row, col } = TileHelper.generateRandomInnerPosition()
        board[row][col] = startTile

        return {
            board,
            queue: TileHelper.generateQueue(),
            canPlaceTile: true,
            gooPosition: null,
            isGameOver: false,
            score: 0,
            startPosition: { row, col }
        }
    },

    onTileClick(row, col) {
        if (!this.state.canPlaceTile) { return }

        const board = this.state.board
        const previousTile = board[row][col]
        board[row][col] = this.state.queue.shift()
        this.state.queue.push(TileHelper.generateRandomTile())
        this.setState({
            board,
            queue: this.state.queue,
            canPlaceTile: false
        })

        const throttle = previousTile.type === Tiles.EMPTY ?
            PLACE_THROTTLE_MS : SWAP_THROTTLE_MS
        setTimeout(() => this.setState({ canPlaceTile: true }), throttle)
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
        return <div>
            <Queue tiles={ this.state.queue } />
            <div className= { styles.board }>
                { this.state.isGameOver &&
                    <div className={ styles.gameOverOverlay }><GameOver /></div> }
                <Board board={ this.state.board }
                       onTileClick={ this.onTileClick }
                       nextTile={ this.state.queue[0] } />
            </div>
            <div>
                Score: { this.state.score }
            </div>
            <button onClick={ this.onStep }>Next</button>
        </div>
    }
})
