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
            <div className={ styles.row }>
                <span className="funky-text is-yellow is-title">Get Ready</span>
                <div className={ styles.row }>Level { this.props.level }</div>
            </div>
            <Button onClick={ this.props.onNextClick }>
                &rarr;
            </Button>
        </div>
    }
})
