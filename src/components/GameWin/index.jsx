import React from 'react'
import cn from 'classnames'

import Button from 'components/Button'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        onRestartClick: React.PropTypes.func,
        score: React.PropTypes.number
    },

    render() {
        return <div>
            <div className={ cn(styles.row, 'funky-text', 'is-green', 'is-title') }>
                You Win!
            </div>

            <div className={ cn(styles.row, 'funky-text', 'is-yellow') }>
                Score: { this.props.score }
            </div>

            <div className={ styles.row }>
                <Button onClick={ this.props.onRestartClick }>
                    <span className="funky-text is-green">Restart</span>
                </Button>
            </div>
        </div>
    }
})
