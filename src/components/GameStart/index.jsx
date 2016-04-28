import React from 'react'

import styles from './styles.less'

export default React.createClass({
    propTypes: {
        onStartClick: React.PropTypes.func
    },

    render() {
        return <div className={ styles.main }>
            <div className={ styles.row }>
                <img src="../../../public/images/start.svg"
                     className={ styles.start }
                     onClick={ this.props.onStartClick } />
            </div>
        </div>
    }
})
