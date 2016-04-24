import React, { PropTypes as Type } from 'react'
import cn from 'classnames'

import animationStyles from 'animations.less'
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

        let gooStyle = {}
        if (tile.type.image && hasGoo) {
            const transitionTime = '1s' // TODO: Set transition time
            // TODO: Map through all goo directions
            const transitionName = TileHelper.getGooAnimation(
                tile.gooDirections[0][0], tile.gooDirections[0][1])
            gooStyle.animation = [
                `${transitionName} ${transitionTime} both`,
                `${animationStyles.fadeIn} ${transitionTime} both`
            ].join(', ')

            const gooImage = TileHelper.getGooImage(
                tile.gooDirections[0][0], tile.gooDirections[0][1])
            gooStyle.backgroundImage = `url(public/images/${gooImage}.svg)`
        }

        // Show the current tile, with an optional ghost preview of the next tile.
        return <div onClick={ () => { isChangeableTile && this.props.onClick() } }
                    className={ cn(styles.tile, tile.type.className) }>
            { hasGoo && <div className={ styles.tileGoo } style={ gooStyle }></div> }
            { nextTile && isChangeableTile &&
                 <div className={ cn(styles.tilePreview, nextTile.type.className) }></div> }
        </div>
    }
})
