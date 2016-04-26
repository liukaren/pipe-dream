import React, { PropTypes as Type } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { TileType, TRANSITION_BOARD_MS } from 'constants'
import { Tiles } from 'tiles'
import tileStyles from 'tiles.less'
import Tile from 'components/Tile'

export default React.createClass({
    propTypes: {
        board: Type.arrayOf(Type.arrayOf(TileType)),
        nextTile: TileType,
        onTileClick: Type.func
    },

    render() {
        return <div>
            { this.props.board.map((rowTiles, row) => (
                <div key={ row }>
                    { rowTiles.map((tile, col) => (
                        <ReactCSSTransitionGroup key={ col }
                                                 className={ tileStyles.background }
                                                 transitionName="board"
                                                 transitionEnterTimeout={ TRANSITION_BOARD_MS }
                                                 transitionLeaveTimeout={ TRANSITION_BOARD_MS }>
                            <Tile tile={ tile }
                                  className={ tile.type === Tiles.EMPTY ? '' : 'is-non-empty' }
                                  key={ tile.animationId }
                                  nextTile={ this.props.nextTile }
                                  onClick={ () => { this.props.onTileClick(row, col) } } />
                        </ReactCSSTransitionGroup>
                    )) }
                </div>
            )) }
        </div>
    }
})
