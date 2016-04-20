import React, { PropTypes as Type } from 'react'

import { TileType } from 'constants'
import Tile from 'components/Tile'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        board: Type.arrayOf(Type.arrayOf(TileType)),
        nextTile: TileType,
        onTileClick: Type.func
    },

    render() {
        return <div className={ styles.main }>
            { this.props.board.map((rowTiles, row) => (
                <div key={ row}>
                    { rowTiles.map((tile, col) => (
                        <Tile tile={ tile } key={ col}
                              nextTile={ this.props.nextTile }
                              onClick={ () => { this.props.onTileClick(row, col) } } />
                    )) }
                </div>
            )) }
        </div>
    }
})
