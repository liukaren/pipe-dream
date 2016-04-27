import React from 'react'

import styles from './styles.less'

export default React.createClass({
    render() {
        return <div className={ styles.main }>
            <div className={ styles.word1 }>
                <img src="../../../public/images/gameover1.svg" />
            </div>
            <div className={ styles.space }></div>
            <div className={ styles.word2 }>
                <img src="../../../public/images/gameover2.svg" />
            </div>
        </div>
    }
})
