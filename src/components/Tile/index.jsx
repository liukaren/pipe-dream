import React, { PropTypes as Type } from 'react'

import { TileType } from 'constants'
import TileHelper from 'tileHelper'
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
        const hasGoo = tile.gooDirections.length > 0
        const isChangeableTile = !isStartTile && !hasGoo

        let tileStyle = {}
        if (tile.type.image) {
            tileStyle.backgroundImage = `url(public/images/${tile.type.image}.png)`
        }

        let gooStyle = {}
        if (tile.type.image && hasGoo) {
            gooStyle.backgroundImage = `url(public/images/${tile.type.image}-fill.png)`

            const transitionTime = '1s' // TODO: Set transition time
            // TODO: Map through all goo directions
            const transitionName = TileHelper.getGooAnimation(
                tile.gooDirections[0][0], tile.gooDirections[0][1])
            gooStyle.animation = `${transitionName} ${transitionTime} both`
        }

        let nextTileStyle = {}
        if (nextTile && nextTile.type.image) {
            nextTileStyle.backgroundImage = `url(public/images/${nextTile.type.image}.png)`
        }

        // Show the current tile, with an optional ghost preview of the next tile.
        return <div onClick={ () => { isChangeableTile && this.props.onClick() } }
                    className={ styles.tile }
                    style={ tileStyle }>
            { hasGoo && <div className={ styles.tileGoo } style={ gooStyle }></div> }
            { nextTile && isChangeableTile &&
                 <div className={ styles.tilePreview }
                      style={ nextTileStyle }></div> }
        </div>
    }
})
