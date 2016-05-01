import React from 'react'

import Button from 'components/Button'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        onRestartClick: React.PropTypes.func
    },

    render() {
        return <div>
            <div className={ styles.row }>
                <div className={ styles.word1 }>
                    <img src="../../../public/images/gameover1.svg" />
                 </div>
                <div className={ styles.space }></div>
                <div className={ styles.word2 }>
                    <img src="../../../public/images/gameover2.svg" />
                </div>
            </div>

            <div className={ styles.row }>
                <Button onClick={ this.props.onRestartClick }
                        className={ styles.restart }>
                    <img src="../../../public/images/restart.svg" />
                </Button>
            </div>
        </div>
    }
})
