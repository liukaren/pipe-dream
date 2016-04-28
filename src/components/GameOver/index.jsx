import React from 'react'

import styles from './styles.less'

export default React.createClass({
    propTypes: {
        onRestartClick: React.PropTypes.func
    },

    render() {
        return <div className={ styles.main }>
            <div className={ styles.row }>
                <img src="../../../public/images/gameover1.svg"
                     className={ styles.word1 } />
                <div className={ styles.space }></div>
                <img src="../../../public/images/gameover2.svg"
                     className={ styles.word2 } />
            </div>

            <div className={ styles.row }>
                <img src="../../../public/images/restart.svg"
                     className={ styles.restart }
                     onClick={ this.props.onRestartClick } />
            </div>
        </div>
    }
})
