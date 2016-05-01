import React from 'react'

import { DIRECTIONS } from 'constants'
import TileHelper from 'tileHelper'
import { StartTiles, Tiles } from 'tiles'
import Board from 'components/Board'
import styles from './styles.less'

const START_DELAY_MS = 3000
const FLOW_SPEED_MS = 2000

export default React.createClass({
    tile1Timeout: null,
    tile2Timeout: null,

    getInitialState() {
        return {
            row: [
                TileHelper.initTileWithType(StartTiles.RIGHT),
                TileHelper.initTileWithType(Tiles.RIGHT_LEFT)
            ]
        }
    },

    componentDidMount() {
        this.tile1Timeout = setTimeout(() => {
            this.state.row[0].gooDirections.push([
                DIRECTIONS.LEFT, DIRECTIONS.RIGHT
            ])
            this.setState({ row: this.state.row })
        }, START_DELAY_MS)
        this.tile2Timeout = setTimeout(() => {
            this.state.row[1].gooDirections.push([
                DIRECTIONS.LEFT, DIRECTIONS.RIGHT
            ])
            this.setState({ row: this.state.row })
        }, START_DELAY_MS + FLOW_SPEED_MS)
    },

    componentWillUnmount() {
        clearTimeout(this.tile1Timeout)
        clearTimeout(this.tile2Timeout)
        this.tile1Timeout = null
        this.tile2Timeout = null
    },

    render() {
        return <div>
            The water begins flowing after the timer counts down.
            Score points by connecting pipes to the start pipe.

            <div className={ styles.demoRow }>
                <div className={ styles.demoTile }>
                    <Board board={ [ this.state.row ] }
                           flowSpeedMs={ FLOW_SPEED_MS }
                           startDelayMs={ START_DELAY_MS } />
                </div>
            </div>
        </div>
    }
})
