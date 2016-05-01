import React from 'react'

import { SWAP_THROTTLE_MS } from 'constants'
import TileHelper from 'tileHelper'
import { Tiles } from 'tiles'
import Board from 'components/Board'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        onTileClick: React.PropTypes.func
    },

    getInitialState() {
        return {
            tile: TileHelper.initTileWithType(Tiles.UP_RIGHT)
        }
    },

    render() {
        const exampleTile = TileHelper.initTileWithType(Tiles.DOWN_LEFT)

        return <div>
            To replace a tile, just click the occupied square.

            <div className={ styles.demoRow }>
                <div className={ styles.demoTile }>
                    <Board board={ [[ this.state.tile ]] }
                           isReplacingTile
                           nextTile={ exampleTile }
                           onTileClick={ () => {
                               this.setState({ tile: exampleTile })
                               setTimeout(this.props.onTileClick, SWAP_THROTTLE_MS)
                           } } />
                </div>
                <img src="public/images/click-hand.svg"
                     className={ styles.demoHand } />
            </div>
        </div>
    }
})
