import React, { PropTypes as Type } from 'react'

import { TileType } from 'constants'
import Tile from 'components/Tile'

export default React.createClass({
    propTypes: {
        board: Type.arrayOf(Type.arrayOf(TileType))
    },

    render() {
        return <div>
            { this.props.board.map((row, rowIndex) => (
                <div key={ rowIndex }>
                    { row.map((tile, colIndex) => (
                        <Tile tile={ tile } key={ colIndex } />
                    )) }
                </div>
            )) }
        </div>
    }
})
