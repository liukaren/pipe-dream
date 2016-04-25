import React, { PropTypes as Type } from 'react'

import { TileType } from 'constants'
import tileStyles from 'tiles.less'
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
                <div key={ row }>
                    { rowTiles.map((tile, col) => (
                        <div key={ tile.animationId }
                             className={ tileStyles.background }
                             style={ { display: 'inline-block' } }>
                            <Tile tile={ tile } key={ tile.animationId }
                                  nextTile={ this.props.nextTile }
                                  onClick={ () => { this.props.onTileClick(row, col) } } />
                        </div>
                    )) }
                </div>
            )) }
        </div>
    }
})
