import { DIRECTIONS } from 'constants'
import styles from 'tiles.less'

export const Tiles = {
    UP_RIGHT: {
        id: 1,
        openings: [DIRECTIONS.UP, DIRECTIONS.RIGHT]
    },
    UP_DOWN: {
        id: 2,
        openings: [DIRECTIONS.UP, DIRECTIONS.DOWN]
    },
    UP_LEFT: {
        id: 3,
        openings: [DIRECTIONS.UP, DIRECTIONS.LEFT]
    },
    RIGHT_DOWN: {
        id: 4,
        openings: [DIRECTIONS.RIGHT, DIRECTIONS.DOWN]
    },
    RIGHT_LEFT: {
        id: 5,
        openings: [DIRECTIONS.RIGHT, DIRECTIONS.LEFT]
    },
    DOWN_LEFT: {
        id: 6,
        openings: [DIRECTIONS.DOWN, DIRECTIONS.LEFT]
    },
    CROSS: {
        id: 7,
        openings: [DIRECTIONS.UP, DIRECTIONS.RIGHT, DIRECTIONS.DOWN, DIRECTIONS.LEFT]
    },
    EMPTY: {
        id: 8,
        openings: []
    }
}
export const StartTiles = {
    UP: {
        id: 1,
        openings: [DIRECTIONS.UP],
        className: styles.startUp
    },
    RIGHT: {
        id: 2,
        openings: [DIRECTIONS.RIGHT],
        className: styles.startRight
    },
    DOWN: {
        id: 3,
        openings: [DIRECTIONS.DOWN],
        className: styles.startDown
    },
    LEFT: {
        id: 4,
        openings: [DIRECTIONS.LEFT],
        className: styles.startLeft
    }
}
