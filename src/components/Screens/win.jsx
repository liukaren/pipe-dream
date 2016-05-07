import React from 'react'

import Button from 'components/Button'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        onRestartClick: React.PropTypes.func,
        score: React.PropTypes.number
    },

    render() {
        return <div className={ styles.main }>
            <div className="funky-text is-green is-title">
                You Win!
            </div>

            <div className={ styles.subtitle }>
                Score: { this.props.score }
            </div>

            <div>
                <Button onClick={ this.props.onRestartClick }>
                    <span className="funky-text is-green">Restart</span>
                </Button>
            </div>
        </div>
    }
})
