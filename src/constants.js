import { PropTypes as Type } from 'react'

export const TileType = Type.shape({
    type: Type.shape({
        id: Type.number.isRequired,
        openings: Type.arrayOf(Type.number).isRequired,
        image: Type.string
    })
})
