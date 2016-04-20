import React from 'react'

import Tiles from 'tiles'
import Board from 'components/Board'
import Queue from 'components/Queue'

const NUM_UNIQUE_TILES = 7 // Excludes EMPTY and START tiles
const NUM_QUEUED_TILES = 5
const NUM_BOARD_ROWS = 5
const NUM_BOARD_COLS = 6
const START_TILES = [
    Tiles.START_UP, Tiles.START_RIGHT,
    Tiles.START_DOWN, Tiles.START_LEFT
]

function generateRandomTile() {
    const randomId = Math.floor(Math.random() * NUM_UNIQUE_TILES) + 1
    return Object.keys(Tiles)
        .map((key) => Tiles[key])
        .find((tile) => tile.id === randomId)
}

export default React.createClass({
    getInitialState() {
        let queue = []
        for (let i = 0; i < NUM_QUEUED_TILES; i++) {
            queue.push(generateRandomTile())
        }

        let board = []
        for (let row = 0; row < NUM_BOARD_ROWS; row++) {
            let rowTiles = []
            for (let col = 0; col < NUM_BOARD_COLS; col++) {
                rowTiles.push(Tiles.EMPTY)
            }
            board.push(rowTiles)
        }

        // TODO: randomly choose a start position and orientation
        board[1][1] = Tiles.START_RIGHT

        return { board, queue }
    },

    onTileClick(row, col) {
        const board = this.state.board

        // Do nothing if the user clicks a start tile
        if (START_TILES.indexOf(board[row][col]) !== -1) { return }

        board[row][col] = this.state.queue.shift()
        this.state.queue.push(generateRandomTile())
        this.setState({ board, queue: this.state.queue })
    },

    render() {
        return <div>
            <Queue tiles={ this.state.queue } />
            <Board board={ this.state.board }
                   onTileClick={ this.onTileClick } />
        </div>
    }
})
