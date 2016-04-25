import React, { PropTypes as Type } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { TileType, TRANSITION_QUEUE_MS } from 'constants'
import Tile from 'components/Tile'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        tiles: Type.arrayOf(TileType).isRequired
    },

    render() {
        return <ReactCSSTransitionGroup className={ styles.main }
                                        transitionName="queue"
                                        transitionEnterTimeout={ TRANSITION_QUEUE_MS }
                                        transitionLeaveTimeout={ TRANSITION_QUEUE_MS }>
            { this.props.tiles.map((tile) => (
                <Tile key={ tile.animationId } tile={ tile } />
            )) }
        </ReactCSSTransitionGroup>
    }
})
