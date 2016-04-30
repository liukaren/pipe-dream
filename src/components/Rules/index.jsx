import React from 'react'

import { Tiles } from 'tiles'
import TileHelper from 'tileHelper'
import tileStyles from 'tiles.less'
import Tile from 'components/Tile'
import tileComponentStyles from 'components/Tile/styles.less'
import styles from './styles.less'

const PAGES = {
    PLACE_TILE: 1,
    REPLACE_TILE: 2,
    QUEUE: 3,
    START_TILE: 4
}

export default React.createClass({
    getInitialState() {
        return { page: PAGES.PLACE_TILE }
    },

    render() {
        return <div className={ styles.main }>
            To place a pipe, click any empty square. The pipe cannot be
            rotated, only placed.

            <div className={ styles.demoRow }>
                <div className={ styles.demoTile }>
                    <div className={ tileStyles.background }></div>
                </div>
                <img src="public/images/click-hand.svg"
                     className={ styles.demoHand } />
                <div className={ styles.demoTile }>
                    <div className={ tileStyles.background }>
                        <Tile tile={ TileHelper.initTileWithType(Tiles.EMPTY) }
                              className={ tileComponentStyles.demoHover }
                              flowSpeedMs={ this.props.flowSpeedMs }
                              nextTile={ TileHelper.initTileWithType(Tiles.UP_RIGHT) } />
                    </div>
                </div>
            </div>
        </div>
    }
})
