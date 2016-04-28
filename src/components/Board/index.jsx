import React, { PropTypes as Type } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import cn from 'classnames'

import { TileType, TRANSITION_BOARD_MS } from 'constants'
import { StartTiles, Tiles } from 'tiles'
import tileStyles from 'tiles.less'
import Tile from 'components/Tile'
import styles from './styles.less'

const START_TILES = Object.keys(StartTiles).map((key) => StartTiles[key])
const START_DELAY_MS = 5000 // TODO: this should be variable

export default React.createClass({
    propTypes: {
        board: Type.arrayOf(Type.arrayOf(TileType)),
        isReplacingTile: Type.bool,
        nextTile: TileType,
        onTileClick: Type.func
    },

    render() {
        return <div>
            { this.props.board.map((rowTiles, row) => (
                <div key={ row }>
                    { rowTiles.map((tile, col) => {
                        // Don't show transitions for empty tiles (whether replacing an empty
                        // tile or restarting the board with empty tiles)
                        const isEmptyTile = tile.type === Tiles.EMPTY

                        const isStartTile = START_TILES.indexOf(tile.type) !== -1

                        return <ReactCSSTransitionGroup key={ col }
                                                 className={ cn(tileStyles.background, styles.col) }
                                                 transitionName="board"
                                                 transitionEnter={ !isEmptyTile }
                                                 transitionLeave={ this.props.isReplacingTile }
                                                 transitionEnterTimeout={ TRANSITION_BOARD_MS }
                                                 transitionLeaveTimeout={ TRANSITION_BOARD_MS }>
                            <Tile tile={ tile }
                                  key={ tile.animationId }
                                  nextTile={ this.props.nextTile }
                                  onClick={ () => { this.props.onTileClick(row, col) } } />
                            { isStartTile &&
                                  <img src="../../../public/images/timer.svg"
                                       className={ styles.timer }
                                       style={ { animationDuration: `${START_DELAY_MS}ms` } } /> }
                        </ReactCSSTransitionGroup>
                    }) }
                </div>
            )) }
        </div>
    }
})
