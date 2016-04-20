import React from 'react'

import { StartTiles, Tiles } from 'tiles'
import Board from 'components/Board'
import Queue from 'components/Queue'

const NUM_PLAYABLE_TILES = 7 // Excludes EMPTY and START tiles
const NUM_START_TILES = 4
const NUM_QUEUED_TILES = 5
const NUM_BOARD_ROWS = 5
const NUM_BOARD_COLS = 6

function generateRandomTile() {
    const randomId = Math.floor(Math.random() * NUM_PLAYABLE_TILES) + 1
    return Object.keys(Tiles)
        .map((key) => Tiles[key])
        .find((tile) => tile.id === randomId)
}

export default React.createClass({
    getInitialState() {
        let queue = []
        for (let i = 0; i < NUM_QUEUED_TILES; i++) {
            queue.push({ type: generateRandomTile() })
        }

        let board = []
        for (let row = 0; row < NUM_BOARD_ROWS; row++) {
            let rowTiles = []
            for (let col = 0; col < NUM_BOARD_COLS; col++) {
                rowTiles.push({ type: Tiles.EMPTY })
            }
            board.push(rowTiles)
        }

        // Randomly choose a start orientation
        const randomId = Math.floor(Math.random() * NUM_START_TILES) + 1
        const startTile = Object.keys(StartTiles)
            .map((key) => StartTiles[key])
            .find((tile) => tile.id === randomId)

        // Randomly choose a start position (but don't choose edges)
        const randomRow = Math.floor(Math.random() * (NUM_BOARD_ROWS - 2)) + 1
        const randomCol = Math.floor(Math.random() * (NUM_BOARD_COLS - 2)) + 1
        board[randomRow][randomCol] = { type: startTile }

        return { board, queue }
    },

    onTileClick(row, col) {
        const board = this.state.board
        board[row][col] = this.state.queue.shift()
        this.state.queue.push({ type: generateRandomTile() })
        this.setState({ board, queue: this.state.queue })
    },

    render() {
        return <div>
            <Queue tiles={ this.state.queue } />
            <Board board={ this.state.board }
                   onTileClick={ this.onTileClick }
                   nextTile={ this.state.queue[0] } />
        </div>
    }
})
