import { PropTypes as Type } from 'react'

export const TRANSITION_QUEUE_MS = 300
export const TRANSITION_SCREEN_MS = 200

export const PLACE_THROTTLE_MS = 300 // How often the user can place new tiles
export const SWAP_THROTTLE_MS = 800 // How often the user can swap existing tiles
export const BOOM_MS = SWAP_THROTTLE_MS - PLACE_THROTTLE_MS

export const TileType = Type.shape({
    type: Type.shape({
        id: Type.number.isRequired,
        openings: Type.arrayOf(Type.number).isRequired,
        image: Type.string
    }).isRequired,

    // Documents all the directions the goo has flowed through, for animation
    // purposes. e.g. [[1,3],[4,2]] means goo flowed from top to bottom and
    // left to right.
    gooDirections: Type.arrayOf(Type.arrayOf(Type.number)).isRequired
})

export const DIRECTIONS = { UP: 1, RIGHT: 2, DOWN: 3, LEFT: 4 }

export const GAME_STATES = {
    SCREEN_START: 1,
    SCREEN_RULES: 2,
    FLOW_NOT_STARTED: 3,
    FLOW_STARTED: 4,
    SCREEN_NEXT: 5,
    SCREEN_LOSE: 6,
    SCREEN_WIN: 7
}
