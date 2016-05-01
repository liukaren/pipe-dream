import React from 'react'

import Button from 'components/Button'
import styles from './styles.less'

export default React.createClass({
    propTypes: {
        level: React.PropTypes.number,
        onNextClick: React.PropTypes.func
    },

    render() {
        // TODO: Replace SVGs with "get ready"

        return <div className={ styles.main }>
            <div className={ styles.row }>
                <div className={ styles.word1 }>
                    <img src="../../../public/images/gameover1.svg" />
                 </div>
                <div className={ styles.space }></div>
                <div className={ styles.word2 }>
                    <img src="../../../public/images/gameover2.svg" />
                </div>
            </div>
            <p>Level { this.props.level }</p>
            <Button onClick={ this.props.onNextClick }>
                &rarr;
            </Button>
        </div>
    }
})
