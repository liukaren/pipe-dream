import React, { PropTypes as Type } from 'react'

import { TileType } from 'constants'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        tile: TileType.isRequired,
        onClick: Type.func
    },

    render() {
        let tileStyle = {}
        if (this.props.tile.image) {
            tileStyle.backgroundImage = `url(public/images/${this.props.tile.image})`
        }
        return <div onClick={ this.props.onClick }
                    className={ styles.tile }
                    style={ tileStyle }></div>
    }
})
