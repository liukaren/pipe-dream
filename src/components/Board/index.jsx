import React, { PropTypes as Type } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import cn from 'classnames'

import { TileType, BOOM_MS, PLACE_THROTTLE_MS, SWAP_THROTTLE_MS } from 'constants'
import { StartTiles, Tiles } from 'tiles'
import tileStyles from 'tiles.less'
import Tile from 'components/Tile'
import styles from './styles.less'

const START_TILES = Object.keys(StartTiles).map((key) => StartTiles[key])

export default React.createClass({
    propTypes: {
        board: Type.arrayOf(Type.arrayOf(TileType)),
        isReplacingTile: Type.bool,
        nextTile: TileType,
        onTileClick: Type.func,
        startDelayMs: Type.number
    },

    render() {
        return <div>
            { this.props.board.map((rowTiles, row) => (
                <div key={ row }>
                    { rowTiles.map((tile, col) => {
                        // Don't show transitions for empty tiles (when
                        // restarting the board with empty tiles)
                        const isEmptyTile = tile.type === Tiles.EMPTY

                        const isStartTile = START_TILES.indexOf(tile.type) !== -1
                        const enterTimeout = this.props.isReplacingTile ?
                            SWAP_THROTTLE_MS : PLACE_THROTTLE_MS

                        const timerStyle = { animationDuration: `${this.props.startDelayMs}ms` }

                        return <ReactCSSTransitionGroup key={ col }
                                                 className={ cn(tileStyles.background, styles.col) }
                                                 transitionName="board"
                                                 transitionEnter={ !isEmptyTile && !isStartTile }
                                                 transitionLeave={ this.props.isReplacingTile }
                                                 transitionEnterTimeout={ enterTimeout }
                                                 transitionLeaveTimeout={ BOOM_MS }>
                            <Tile tile={ tile }
                                  className={ this.props.isReplacingTile ? 'is-replacing' : '' }
                                  key={ tile.animationId }
                                  nextTile={ this.props.nextTile }
                                  onClick={ () => { this.props.onTileClick(row, col) } } />

                            { isStartTile && // Timer over start tile (before goo starts flowing)
                                  <img src="../../../public/images/timer.svg"
                                       className={ styles.timer }
                                       style={ timerStyle } /> }
                        </ReactCSSTransitionGroup>
                    }) }
                </div>
            )) }
        </div>
    }
})
