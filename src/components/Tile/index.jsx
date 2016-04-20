import React, { PropTypes as Type } from 'react'
import cn from 'classnames'

import { TileType } from 'constants'
import { StartTiles } from 'tiles'
import styles from './styles.less'

const START_TILES = Object.keys(StartTiles).map((key) => StartTiles[key])

export default React.createClass({
    propTypes: {
        tile: TileType.isRequired,
        nextTile: TileType,
        onClick: Type.func
    },

    render() {
        const tile = this.props.tile
        const nextTile = this.props.nextTile
        const isStartTile = START_TILES.indexOf(tile.type) !== -1

        let tileStyle = {}
        if (tile.type.image) {
            tileStyle.backgroundImage = `url(public/images/${tile.type.image})`
        }

        let nextTileStyle = {}
        if (nextTile && nextTile.type.image) {
            nextTileStyle.backgroundImage = `url(public/images/${nextTile.type.image})`
        }

        // Show the current tile, with an optional ghost preview of the next tile.
        return <div onClick={ () => { !isStartTile && !tile.hasGoo && this.props.onClick() } }
                    className={ cn(styles.tile, tile.hasGoo && styles.hasGoo) }
                    style={ tileStyle }>
            { nextTile && !isStartTile &&
                 <div className={ styles.tilePreview }
                      style={ nextTileStyle }></div> }
        </div>
    }
})
