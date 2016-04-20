import React from 'react'

import Tiles from 'tiles'
import Board from 'components/Board'
import Queue from 'components/Queue'

const NUM_UNIQUE_TILES = 7 // Excludes EMPTY
const NUM_QUEUED_TILES = 5

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

        return <div>
            <Queue tiles={ queuedTiles } />
            <Board board={ [
                [Tiles.UP_RIGHT, Tiles.RIGHT_LEFT, Tiles.EMPTY, Tiles.DOWN_LEFT],
                [Tiles.RIGHT_LEFT, Tiles.RIGHT_DOWN, Tiles.UP_DOWN, Tiles.EMPTY]
            ] } />
        </div>
    }
})
