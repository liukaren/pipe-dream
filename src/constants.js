import { PropTypes as Type } from 'react'

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
