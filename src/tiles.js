import styles from 'tiles.less';

// 1 = up, 2 = right, 3 = down, 4 = left
export const Tiles = {
    UP_RIGHT: {
        id: 1,
        openings: [1, 2],
        image: 'up-right',
        className: styles.upRight
    },
    UP_DOWN: {
        id: 2,
        openings: [1, 3],
        image: 'up-down',
        className: styles.upDown
    },
    UP_LEFT: {
        id: 3,
        openings: [1, 4],
        image: 'up-left',
        className: styles.upLeft
    },
    RIGHT_DOWN: {
        id: 4,
        openings: [2, 3],
        image: 'right-down',
        className: styles.rightDown
    },
    RIGHT_LEFT: {
        id: 5,
        openings: [2, 4],
        image: 'right-left',
        className: styles.rightLeft
    },
    DOWN_LEFT: {
        id: 6,
        openings: [3, 4],
        image: 'down-left',
        className: styles.downLeft
    },
    CROSS: {
        id: 7,
        openings: [1, 2, 3, 4],
        image: 'cross',
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
        openings: [1],
        image: 'start-up',
        className: styles.startUp
    },
    RIGHT: {
        id: 2,
        openings: [2],
        image: 'start-right',
        className: styles.startRight
    },
    DOWN: {
        id: 3,
        openings: [3],
        image: 'start-down',
        className: styles.startDown
    },
    LEFT: {
        id: 4,
        openings: [4],
        image: 'start-left',
        className: styles.startLeft
    }
}
