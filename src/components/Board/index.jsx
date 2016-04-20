import React, { PropTypes as Type } from 'react'

import Tile from 'components/Tile'

export default React.createClass({
    propTypes: {
        board: Type.array.isRequired
    },

    render() {
        return <div>
            { this.props.board.map((tile, index) => {
                return <Tile tile={ tile } key={ index } />
            }) }
        </div>
    }
})
