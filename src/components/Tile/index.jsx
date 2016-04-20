import React, { PropTypes as Type } from 'react'

import styles from './styles.less'

export default React.createClass({
    propTypes: {
        tile: Type.shape({
            id: Type.number.isRequired,
            openings: Type.arrayOf(Type.number).isRequired,
            image: Type.string
        }).isRequired
    },

    render() {
        let tileStyle = {}
        if (this.props.tile.image) {
            tileStyle.backgroundImage = `url(public/images/${this.props.tile.image})`
        }
        return <div className={ styles.tile } style={ tileStyle }></div>
    }
})
