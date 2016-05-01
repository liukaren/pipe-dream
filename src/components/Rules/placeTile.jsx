import React from 'react'

import { PLACE_THROTTLE_MS } from 'constants'
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
            tile: TileHelper.initTileWithType(Tiles.EMPTY)
        }
    },

    render() {
        const exampleTile = TileHelper.initTileWithType(Tiles.UP_RIGHT)

        return <div>
            To place a pipe, click an empty square. The pipe cannot be
            rotated, only placed.

            <div className={ styles.demoRow }>
                <div className={ styles.demoTile }>
                    <Board board={ [[ this.state.tile ]] }
                           isReplacingTile={ false }
                           nextTile={ exampleTile }
                           onTileClick={ () => {
                               this.setState({ tile: exampleTile })
                               setTimeout(this.props.onTileClick, PLACE_THROTTLE_MS)
                           } } />
                </div>
                <img src="public/images/click-hand.svg"
                     className={ styles.demoHand } />
            </div>
        </div>
    }
})
