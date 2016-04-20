import { StartTiles, Tiles } from 'tiles'

const NUM_PLAYABLE_TILES = 7 // Excludes EMPTY and START tiles
const NUM_START_TILES = 4
const NUM_QUEUED_TILES = 5
const NUM_BOARD_ROWS = 5
const NUM_BOARD_COLS = 6

const TileHelper = {
    generateRandomTile() {
        const randomId = Math.floor(Math.random() * NUM_PLAYABLE_TILES) + 1
        return Object.keys(Tiles)
            .map((key) => Tiles[key])
            .find((tile) => tile.id === randomId)
    },

    generateRandomStartTile() {
        const randomId = Math.floor(Math.random() * NUM_START_TILES) + 1
        return Object.keys(StartTiles)
            .map((key) => StartTiles[key])
            .find((tile) => tile.id === randomId)
    },

    // Avoids edges when generating a position.
    generateRandomInnerPosition() {
        const row = Math.floor(Math.random() * (NUM_BOARD_ROWS - 2)) + 1
        const col = Math.floor(Math.random() * (NUM_BOARD_COLS - 2)) + 1
        return { row, col }
    },

    // The math is a little weird because directions are 1-indexed.
    getOppositeDirection(direction) {
        return (direction + 1) % 4 + 1
    },

    getExitDirection(tileType, enterDirection) {
        // Always try to go straight if possible
        const oppositeDirection = TileHelper.getOppositeDirection(enterDirection)
        if (tileType.openings.indexOf(oppositeDirection) !== -1) {
            return oppositeDirection
        }

        // Otherwise, take the other available position
        return tileType.openings.find((opening) => opening !== enterDirection)
    },

    getNextPosition(row, col, direction) {
        switch (direction) {
            case 1: return { row: row - 1, col }
            case 2: return { row, col: col + 1 }
            case 3: return { row: row + 1, col }
            case 4: return { row, col: col - 1 }
        }
    },

    generateEmptyBoard() {
        let board = []
        for (let row = 0; row < NUM_BOARD_ROWS; row++) {
            let rowTiles = []
            for (let col = 0; col < NUM_BOARD_COLS; col++) {
                rowTiles.push({ type: Tiles.EMPTY })
            }
            board.push(rowTiles)
        }
        return board
    },

    generateQueue() {
        let queue = []
        for (let i = 0; i < NUM_QUEUED_TILES; i++) {
            queue.push({ type: TileHelper.generateRandomTile() })
        }
        return queue
    },

    isOutOfBounds(row, col) {
        return row < 0 || row >= NUM_BOARD_ROWS || col < 0 || col >= NUM_BOARD_COLS
    }
}

export default TileHelper
