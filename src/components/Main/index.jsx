import React from 'react'

import Tiles from 'tiles'
import Board from 'components/Board'

export default React.createClass({
    render() {
        return <Board board={ [Tiles.UP_RIGHT, Tiles.RIGHT_LEFT, Tiles.EMPTY, Tiles.DOWN_LEFT] } />
    }
})
