import animationStyles from 'animations.less'
import { DIRECTIONS, NUM_QUEUED_TILES } from 'constants'
import { StartTiles, Tiles } from 'tiles'

const NUM_START_TILES = 4
const NUM_BOARD_ROWS = 7
const NUM_BOARD_COLS = 10

let tileIdCounter = 1 // Set globally unique IDs on tiles (for animation purposes)

function getDirectionName(direction) {
    switch(direction) {
        case DIRECTIONS.UP    : return 'Up'
        case DIRECTIONS.RIGHT : return 'Right'
        case DIRECTIONS.DOWN  : return 'Down'
        case DIRECTIONS.LEFT  : return 'Left'
    }
}

function initTileWithType(type) {
    return { type, gooDirections: [], animationId: tileIdCounter++ }
}

// From http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const TileHelper = {
    initTileWithType: initTileWithType,

    // Random Generator (permuted sequence of possible tiles)
    // http://tetris.wikia.com/wiki/Random_Generator
    // Thanks Dave & David!
    generateRandomTileSet() {
        const tileTypes = Object.keys(Tiles)
            .map((key) => initTileWithType(Tiles[key]))
            .filter((tile) => tile.type !== Tiles.EMPTY)
        return shuffle(tileTypes)
    },

    generateRandomStartTile() {
        const randomId = Math.floor(Math.random() * NUM_START_TILES) + 1
        const tileType = Object.keys(StartTiles)
            .map((key) => StartTiles[key])
            .find((tile) => tile.id === randomId)
        return initTileWithType(tileType)
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
            case DIRECTIONS.UP    : return { row: row - 1, col }
            case DIRECTIONS.RIGHT : return { row, col: col + 1 }
            case DIRECTIONS.DOWN  : return { row: row + 1, col }
            case DIRECTIONS.LEFT  : return { row, col: col - 1 }
        }
    },

    generateEmptyBoard() {
        let board = []
        for (let row = 0; row < NUM_BOARD_ROWS; row++) {
            let rowTiles = []
            for (let col = 0; col < NUM_BOARD_COLS; col++) {
                rowTiles.push(initTileWithType(Tiles.EMPTY))
            }
            board.push(rowTiles)
        }
        return board
    },

    generateEmptyQueue() {
        let queue = []
        for (let i = 0; i < NUM_QUEUED_TILES; i++) {
            queue.push(initTileWithType(Tiles.EMPTY))
        }
        return queue
    },

    isOutOfBounds(row, col) {
        return row < 0 || row >= NUM_BOARD_ROWS || col < 0 || col >= NUM_BOARD_COLS
    },

    getGooAnimation(enter, exit) {
        const enterName = getDirectionName(enter)
        const exitName = getDirectionName(exit)
        const animationName = `flow${enterName}To${exitName}`
        return animationStyles[animationName]
    },

    getGooImage(enter, exit) {
        const [dir1, dir2] = [enter, exit].sort()
        const dirName1 = getDirectionName(dir1).toLowerCase()
        const dirName2 = getDirectionName(dir2).toLowerCase()
        return `${dirName1}-${dirName2}-fill`
    },

    getTileStyle(tileType) {
        let backgroundImage
        switch(tileType) {
            case Tiles.EMPTY: return {}
            case StartTiles.UP:
            case StartTiles.DOWN:
                backgroundImage = 'up-down'
                break
            case StartTiles.RIGHT:
            case StartTiles.LEFT:
                backgroundImage = 'right-left'
                break
            default:
                backgroundImage = tileType.openings
                    .sort()
                    .map((opening) => getDirectionName(opening).toLowerCase())
                    .join('-')
        }

        return {
            backgroundImage: `url(public/images/${backgroundImage}.svg)`
        }
    }
}

export default TileHelper
