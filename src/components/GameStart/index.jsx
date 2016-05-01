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
                <span className="funky-text is-title">Pipe Dream</span>
            </div>
            <div className={ styles.row }>
                <Button className={ styles.button }
                        onClick={ this.props.onStartClick }>
                    <span className="funky-text is-green">Start</span>
                </Button>
                <Button className={ styles.button }
                        onClick={ this.props.onRulesClick }>
                    <span className="funky-text is-red">Rules</span>
                </Button>
            </div>
        </div>
    }
})
