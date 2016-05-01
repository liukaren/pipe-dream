import React from 'react'
import cn from 'classnames'

import { Tiles } from 'tiles'
import TileHelper from 'tileHelper'
import tileStyles from 'tiles.less'
import Button from 'components/Button'
import Tile from 'components/Tile'
import styles from './styles.less'

const PAGES = {
    PLACE_TILE: 1,
    REPLACE_TILE: 2,
    QUEUE: 3,
    START_TILE: 4
}

export default React.createClass({
    propTypes: {
        onExit: React.PropTypes.func
    },

    getInitialState() {
        return { page: PAGES.PLACE_TILE }
    },

    goBack() {
        if (this.state.page > PAGES.PLACE_TILE) {
            this.setState({ page: this.state.page - 1 })
        } else {
            this.props.onExit()
        }
    },

    goForward() {
        if (this.state.page < PAGES.START_TILE) {
            this.setState({ page: this.state.page + 1 })
        } else {
            this.props.onExit()
        }
    },

    render() {
        let contents
        if (this.state.page === PAGES.PLACE_TILE) {
            contents = <div>
                To place a pipe, click an empty square. The pipe cannot be
                rotated, only placed.

                <div className={ styles.demoRow }>
                    <div className={ styles.demoTile }>
                        <div className={ tileStyles.background }>
                            <Tile tile={ TileHelper.initTileWithType(Tiles.EMPTY) }
                                  nextTile={ TileHelper.initTileWithType(Tiles.UP_RIGHT) }
                                  onClick={ () => { this.setState({ page: PAGES.REPLACE_TILE }) } } />
                        </div>
                    </div>
                    <img src="public/images/click-hand.svg"
                         className={ styles.demoHand } />
                </div>
            </div>
        } else if (this.state.page === PAGES.REPLACE_TILE) {
            contents = <div>
                To replace a tile, just click the occupied square.

                <div className={ styles.demoRow }>
                    <div className={ styles.demoTile }>
                        <div className={ tileStyles.background }>
                            <Tile tile={ TileHelper.initTileWithType(Tiles.UP_RIGHT) }
                                  nextTile={ TileHelper.initTileWithType(Tiles.DOWN_LEFT) }
                                  onClick={ () => { this.setState({ page: PAGES.QUEUE }) } } />
                        </div>
                    </div>
                    <img src="public/images/click-hand.svg"
                         className={ styles.demoHand } />
                </div>
            </div>
        } else if (this.state.page === PAGES.QUEUE) {
            contents = <div>
                The queue shows upcoming tiles.

                <div className={ styles.demoRow }>
                    <p>Next</p>
                    <div className={ cn(styles.queueTile, tileStyles.background) }>
                        <Tile tile={ TileHelper.initTileWithType(Tiles.RIGHT_LEFT) } />
                    </div>
                    <div className={ cn(styles.queueTile, tileStyles.background) }>
                        <Tile tile={ TileHelper.initTileWithType(Tiles.CROSS) } />
                    </div>
                </div>
            </div>
        } else {
            contents = <div>moar rules</div>
        }

        return <div>
            { contents }
            <div className={ styles.demoRow }>
                <Button className={ styles.arrow }
                        onClick={ this.goBack }>&larr;</Button>
                <Button className={ styles.arrow }
                        onClick={ this.goForward }>&rarr;</Button>
            </div>
        </div>
    }
})
