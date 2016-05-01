import React from 'react'
import cn from 'classnames'

import Button from 'components/Button'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        onRestartClick: React.PropTypes.func
    },

    render() {
        return <div>
            <div className={ cn(styles.row, 'funky-text', 'is-red', 'is-title') }>
                <div className={ styles.word1 }>Game</div>
                &nbsp;
                <div className={ styles.word2 }>Over</div>
            </div>

            <div className={ styles.row }>
                <Button onClick={ this.props.onRestartClick }>
                    <span className="funky-text is-green">Restart</span>
                </Button>
            </div>
        </div>
    }
})
