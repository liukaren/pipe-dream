import React from 'react'

import { TileType } from 'constants'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        tile: TileType.isRequired
    },

    render() {
        let tileStyle = {}
        if (this.props.tile.image) {
            tileStyle.backgroundImage = `url(public/images/${this.props.tile.image})`
        }
        return <div className={ styles.tile } style={ tileStyle }></div>
    }
})
