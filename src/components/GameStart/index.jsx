import React from 'react'

import Button from 'components/Button'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        onStartClick: React.PropTypes.func,
        onRulesClick: React.PropTypes.func
    },

    render() {
        return <div className={ styles.main }>
            <div className={ styles.row }>
                <Button className={ styles.col }
                        onClick={ this.props.onStartClick }>
                    <img src="../../../public/images/start.svg" />
                </Button>
                <div className={ styles.spacer }></div>
                <Button className={ styles.col }
                        onClick={ this.props.onRulesClick }>
                    <img src="../../../public/images/rules.svg" />
                </Button>
            </div>
        </div>
    }
})
