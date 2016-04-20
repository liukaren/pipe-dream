import React, { PropTypes as Type } from 'react'

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
        const isStartTile = START_TILES.indexOf(this.props.tile) !== -1

        let tileStyle = {}
        if (this.props.tile.image) {
            tileStyle.backgroundImage = `url(public/images/${this.props.tile.image})`
        }

        let nextTileStyle = {}
        if (this.props.nextTile && this.props.nextTile.image) {
            nextTileStyle.backgroundImage = `url(public/images/${this.props.nextTile.image})`
        }

        // Show the current tile, with an optional ghost preview of the next tile.
        return <div onClick={ () => { !isStartTile && this.props.onClick() } }
                    className={ styles.tile }
                    style={ tileStyle }>
            { this.props.nextTile && !isStartTile &&
                 <div className={ styles.tilePreview }
                      style={ nextTileStyle }></div> }
        </div>
    }
})
