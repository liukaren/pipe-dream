import React, { PropTypes as Type } from 'react'

import styles from './styles.less'

export default React.createClass({
    propTypes: {
        tile: Type.object.isRequired
    },

    render() {
        const tileStyle = {
            backgroundImage: `url(public/images/${this.props.tile.image})`
        }
        return <div className={ styles.tile }
                    style={ tileStyle }></div>
    }
})
