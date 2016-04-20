// 1 = up, 2 = right, 3 = down, 4 = left
export const Tiles = {
    UP_RIGHT: {
        id: 1,
        openings: [1, 2],
        image: 'up-right.png'
    },
    UP_DOWN: {
        id: 2,
        openings: [1, 3],
        image: 'up-down.png'
    },
    UP_LEFT: {
        id: 3,
        openings: [1, 4],
        image: 'up-left.png'
    },
    RIGHT_DOWN: {
        id: 4,
        openings: [2, 3],
        image: 'right-down.png'
    },
    RIGHT_LEFT: {
        id: 5,
        openings: [2, 4],
        image: 'right-left.png'
    },
    DOWN_LEFT: {
        id: 6,
        openings: [3, 4],
        image: 'down-left.png'
    },
    CROSS: {
        id: 7,
        openings: [1, 2, 3, 4],
        image: 'cross.png'
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
        image: 'start-up.png'
    },
    RIGHT: {
        id: 2,
        openings: [2],
        image: 'start-right.png'
    },
    DOWN: {
        id: 3,
        openings: [3],
        image: 'start-down.png'
    },
    LEFT: {
        id: 4,
        openings: [4],
        image: 'start-left.png'
    }
}
