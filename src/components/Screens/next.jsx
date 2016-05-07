import React from 'react'

import Button from 'components/Button'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        level: React.PropTypes.number,
        onNextClick: React.PropTypes.func
    },

    render() {
        return <div className={ styles.main }>
            <div className="funky-text is-yellow is-title">Get Ready</div>
            <div className={ styles.subtitle }>Level { this.props.level }</div>
            <Button onClick={ this.props.onNextClick }>
                <span className="funky-text is-green">Next</span>
            </Button>
        </div>
    }
})
