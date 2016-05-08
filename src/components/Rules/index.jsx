import React from 'react'
import cn from 'classnames'

import { Tiles } from 'tiles'
import TileHelper from 'tileHelper'
import tileStyles from 'tiles.less'
import Button from 'components/Button'
import Tile from 'components/Tile'

import FastFlow from './fastFlow'
import PlaceTile from './placeTile'
import SwapTile from './swapTile'
import StartTile from './startTile'
import styles from './styles.less'

const PAGES = {
    PLACE_TILE: 1,
    REPLACE_TILE: 2,
    QUEUE: 3,
    START_TILE: 4,
    FAST_FLOW: 5
}

export default React.createClass({
    propTypes: {
        onExit: React.PropTypes.func
    },

    getInitialState() {
        return { page: PAGES.PLACE_TILE }
    },

    isFirstPage() {
        return this.state.page === PAGES.PLACE_TILE
    },

    isLastPage() {
        return this.state.page === PAGES.FAST_FLOW
    },

    goBack() {
        if (this.isFirstPage()) {
            this.props.onExit()
        } else {
            this.setState({ page: this.state.page - 1 })
        }
    },

    goForward() {
        if (this.isLastPage()) {
            this.props.onExit()
        } else {
            this.setState({ page: this.state.page + 1 })
        }
    },

    render() {
        let contents
        if (this.state.page === PAGES.PLACE_TILE) {
            contents = <PlaceTile onTileClick={ () => {
                this.setState({ page: PAGES.REPLACE_TILE })
            } } />
        } else if (this.state.page === PAGES.REPLACE_TILE) {
            contents = <SwapTile onTileClick={ () => {
                this.setState({ page: PAGES.QUEUE })
            } } />
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
        } else if (this.state.page === PAGES.START_TILE) {
            contents = <StartTile />
        } else if (this.state.page === PAGES.FAST_FLOW) {
            contents = <FastFlow />
        }

        return <div>
            { contents }
            <div className={ styles.demoRow }>
                <Button className="funky-text is-red"
                        onClick={ this.goBack }>Back</Button>
                <Button className="funky-text is-green"
                        onClick={ this.goForward }>
                    { this.isLastPage() ? 'To Game' : 'Next' }
                </Button>
            </div>
        </div>
    }
})
