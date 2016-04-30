import React from 'react'
import cn from 'classnames'

import styles from './styles.less'

export default React.createClass({
    propTypes: {
        children: React.PropTypes.node,
        className: React.PropTypes.string,
        onClick: React.PropTypes.func
    },

    render() {
        return <button className={ cn(styles.main, this.props.className) }
                       onClick={ this.props.onClick }>
            { this.props.children }
        </button>
    }
})
