import React from 'react'

import styles from './styles.less'

export default React.createClass({
    propTypes: {
        onStartClick: React.PropTypes.func,
        onRulesClick: React.PropTypes.func
    },

    render() {
        return <div className={ styles.main }>
            <div className={ styles.row }>
                <div className={ styles.col }>
                    <img src="../../../public/images/start.svg"
                         className={ styles.button }
                         onClick={ this.props.onStartClick } />
                </div>
                <div className={ styles.spacer }></div>
                <div className={ styles.col }>
                    <img src="../../../public/images/rules.svg"
                         className={ styles.button }
                         onClick={ this.props.onRulesClick } />
                </div>
            </div>
        </div>
    }
})
