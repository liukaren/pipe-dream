import React from 'react'

import Tiles from 'tiles'
import Board from 'components/Board'
import Queue from 'components/Queue'

export default React.createClass({
    render() {
        return <div>
            <Queue tiles={ [Tiles.UP_RIGHT, Tiles.RIGHT_LEFT, Tiles.EMPTY, Tiles.DOWN_LEFT] } />
            <Board board={ [
                [Tiles.UP_RIGHT, Tiles.RIGHT_LEFT, Tiles.EMPTY, Tiles.DOWN_LEFT],
                [Tiles.RIGHT_LEFT, Tiles.RIGHT_DOWN, Tiles.UP_DOWN, Tiles.EMPTY]
            ] } />
        </div>
    }
})
