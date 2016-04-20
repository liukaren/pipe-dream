import React, { PropTypes as Type } from 'react'

import { TileType } from 'constants'
import Tile from 'components/Tile'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        tiles: Type.arrayOf(TileType)
    },

    render() {
        return <div className={ styles.main }>
            { this.props.tiles.map((tile, index) => (
                <Tile tile={ tile } key={ index } />
            )) }
        </div>
    }
})
