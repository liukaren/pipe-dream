// 1 = up, 2 = right, 3 = down, 4 = left
export const Tiles = {
    UP_RIGHT: {
        id: 1,
        openings: [1, 2],
        image: 'up-right'
    },
    UP_DOWN: {
        id: 2,
        openings: [1, 3],
        image: 'up-down'
    },
    UP_LEFT: {
        id: 3,
        openings: [1, 4],
        image: 'up-left'
    },
    RIGHT_DOWN: {
        id: 4,
        openings: [2, 3],
        image: 'right-down'
    },
    RIGHT_LEFT: {
        id: 5,
        openings: [2, 4],
        image: 'right-left'
    },
    DOWN_LEFT: {
        id: 6,
        openings: [3, 4],
        image: 'down-left'
    },
    CROSS: {
        id: 7,
        openings: [1, 2, 3, 4],
        image: 'cross'
    },
    EMPTY: {
        id: 8,
        openings: []
    }
}
export const StartTiles = {
    UP: {
        id: 1,
        openings: [1],
        image: 'start-up'
    },
    RIGHT: {
        id: 2,
        openings: [2],
        image: 'start-right'
    },
    DOWN: {
        id: 3,
        openings: [3],
        image: 'start-down'
    },
    LEFT: {
        id: 4,
        openings: [4],
        image: 'start-left'
    }
}
