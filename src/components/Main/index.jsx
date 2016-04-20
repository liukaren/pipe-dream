import React from 'react'

import Tiles from 'tiles'
import Board from 'components/Board'
import Queue from 'components/Queue'

const NUM_UNIQUE_TILES = 7 // Excludes EMPTY
const NUM_QUEUED_TILES = 5
const NUM_BOARD_ROWS = 5
const NUM_BOARD_COLS = 6

function generateRandomTile() {
    const randomId = Math.floor(Math.random() * NUM_UNIQUE_TILES) + 1
    return Object.keys(Tiles)
        .map((key) => Tiles[key])
        .find((tile) => tile.id === randomId)
}

export default React.createClass({
    render() {
        let queuedTiles = []
        for (let i = 0; i < NUM_QUEUED_TILES; i++) {
            queuedTiles.push(generateRandomTile())
        }

        let boardTiles = []
        for (let row = 0; row < NUM_BOARD_ROWS; row++) {
            let rowTiles = []
            for (let col = 0; col < NUM_BOARD_COLS; col++) {
                rowTiles.push(Tiles.EMPTY)
            }
            boardTiles.push(rowTiles)
        }

        return <div>
            <Queue tiles={ queuedTiles } />
            <Board board={ boardTiles } />
        </div>
    }
})
