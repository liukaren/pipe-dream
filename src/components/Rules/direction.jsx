import React from 'react'

import { DIRECTIONS } from 'constants'
import TileHelper from 'tileHelper'
import { StartTiles, Tiles } from 'tiles'
import Board from 'components/Board'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        onTileClick: React.PropTypes.func
    },

    render() {
        const board = [[
            TileHelper.initTileWithType(StartTiles.RIGHT),
            TileHelper.initTileWithType(Tiles.CROSS),
            TileHelper.initTileWithType(Tiles.CROSS),
            TileHelper.initTileWithType(Tiles.DOWN_LEFT)
        ]]
        board[0][0].gooDirections = [[DIRECTIONS.LEFT, DIRECTIONS.RIGHT]]
        board[0][1].gooDirections = [[DIRECTIONS.LEFT, DIRECTIONS.RIGHT]]
        board[0][2].gooDirections = [[DIRECTIONS.LEFT, DIRECTIONS.RIGHT]]
        board[0][3].gooDirections = [[DIRECTIONS.LEFT, DIRECTIONS.DOWN]]

        return <div>
            Water will flow straight until it hits a curve.

            <div className={ styles.demoRow }>
                <div className={ styles.demoTile }>
                    <Board board={ board }
                           isReplacingTile={ false } />
                </div>
            </div>
        </div>
    }
})
