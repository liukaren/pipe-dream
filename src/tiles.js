import { DIRECTIONS } from 'constants'
import styles from 'tiles.less'

export const Tiles = {
    UP_RIGHT: {
        id: 1,
        openings: [DIRECTIONS.UP, DIRECTIONS.RIGHT],
        className: styles.upRight
    },
    UP_DOWN: {
        id: 2,
        openings: [DIRECTIONS.UP, DIRECTIONS.DOWN],
        className: styles.upDown
    },
    UP_LEFT: {
        id: 3,
        openings: [DIRECTIONS.UP, DIRECTIONS.LEFT],
        className: styles.upLeft
    },
    RIGHT_DOWN: {
        id: 4,
        openings: [DIRECTIONS.RIGHT, DIRECTIONS.DOWN],
        className: styles.rightDown
    },
    RIGHT_LEFT: {
        id: 5,
        openings: [DIRECTIONS.RIGHT, DIRECTIONS.LEFT],
        className: styles.rightLeft
    },
    DOWN_LEFT: {
        id: 6,
        openings: [DIRECTIONS.DOWN, DIRECTIONS.LEFT],
        className: styles.downLeft
    },
    CROSS: {
        id: 7,
        openings: [DIRECTIONS.UP, DIRECTIONS.RIGHT, DIRECTIONS.DOWN, DIRECTIONS.LEFT],
        className: styles.cross
    },
    EMPTY: {
        id: 8,
        openings: [],
        className: ''
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
