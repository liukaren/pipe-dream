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
        onClick: Type.func,
        className: Type.string,
        flowSpeedMs: Type.number
    },

    getDefaultProps() {
        return { onClick: () => {} }
    },

    render() {
        const tile = this.props.tile
        const nextTile = this.props.nextTile
        const isStartTile = START_TILES.indexOf(tile.type) !== -1
        const hasGoo = tile.gooDirections.length > 0
        const isChangeableTile = !isStartTile && !hasGoo

        const gooTiles = tile.gooDirections.map(([enter, exit], index) => {
            let gooStyle = {}

            const transitionTime = `${this.props.flowSpeedMs}ms`
            const transitionName = TileHelper.getGooAnimation(enter, exit)
            gooStyle.animation = [
                `${transitionName} ${transitionTime} both`,
                `${animationStyles.fadeIn} ${transitionTime} both`
            ].join(', ')

            const gooImage = TileHelper.getGooImage(enter, exit)
            gooStyle.backgroundImage = `url(public/images/${gooImage}.svg)`

            return <div key={ index }
                        className={ styles.tileGoo }
                        style={ gooStyle }></div>
        })

        // Show the current tile, with an optional ghost preview of the next tile.
        return <div onClick={ () => { isChangeableTile && this.props.onClick() } }
                    className={ cn(styles.tile, tile.type.className, this.props.className) }
                    style={ TileHelper.getTileStyle(tile.type) }>
            { gooTiles }
            { nextTile && isChangeableTile &&
                <div className={ cn(styles.tilePreview, nextTile.type.className) }
                     style={ TileHelper.getTileStyle(nextTile.type) }></div> }
        </div>
    }
})
