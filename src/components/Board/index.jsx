import React, { PropTypes as Type } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { TileType, TRANSITION_BOARD_MS } from 'constants'
import tileStyles from 'tiles.less'
import Tile from 'components/Tile'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        board: Type.arrayOf(Type.arrayOf(TileType)),
        nextTile: TileType,
        onTileClick: Type.func
    },

    render() {
        return <div className={ styles.main }>
            { this.props.board.map((rowTiles, row) => (
                <div key={ row }>
                    { rowTiles.map((tile, col) => (
                        <ReactCSSTransitionGroup key={ col }
                                                 className={ tileStyles.background }
                                                 transitionName="board"
                                                 transitionEnterTimeout={ TRANSITION_BOARD_MS }
                                                 transitionLeaveTimeout={ TRANSITION_BOARD_MS }>
                            <Tile tile={ tile }
                                  key={ tile.animationId }
                                  className={ styles.tile }
                                  nextTile={ this.props.nextTile }
                                  onClick={ () => { this.props.onTileClick(row, col) } } />
                        </ReactCSSTransitionGroup>
                    )) }
                </div>
            )) }
        </div>
    }
})
