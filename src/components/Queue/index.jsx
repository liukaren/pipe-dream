import React, { PropTypes as Type } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { TileType, TRANSITION_QUEUE_MS } from 'constants'
import tileStyles from 'tiles.less'
import Tile from 'components/Tile'

export default React.createClass({
    propTypes: {
        tiles: Type.arrayOf(TileType).isRequired
    },

    render() {
        return <ReactCSSTransitionGroup component="div"
                                        transitionName="queue"
                                        transitionEnterTimeout={ TRANSITION_QUEUE_MS }
                                        transitionLeaveTimeout={ TRANSITION_QUEUE_MS }>
            { this.props.tiles.map((tile) => (
                <div key={ tile.animationId }
                     className={ tileStyles.background }>
                    <Tile tile={ tile } />
                </div>
            )) }
        </ReactCSSTransitionGroup>
    }
})
