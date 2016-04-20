import React, { PropTypes as Type } from 'react'

export default React.createClass({
    propTypes: {
        board: Type.array.isRequired
    },

    render() {
        return <div>
            { this.props.board.map((item) => (item)) }
        </div>
    }
})
