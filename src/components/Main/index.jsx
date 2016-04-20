import React from 'react'

import TileHelper from 'tileHelper'
import Board from 'components/Board'
import Queue from 'components/Queue'

export default React.createClass({
    getInitialState() {
        const board = TileHelper.generateEmptyBoard()
        const startTile = TileHelper.generateRandomStartTile()
        const { row, col } = TileHelper.generateRandomInnerPosition()
        board[row][col] = { type: startTile }

        // Use this to calculate the next goo position.
        // exitDirection is where it will go next, one of { 1, 2, 3, 4 } --
        // clockwise from top.
        const gooPosition = {
            row, col,
            exitDirection: startTile.openings[0]
        }

        return { board, queue: TileHelper.generateQueue(), gooPosition }
    },

    onTileClick(row, col) {
        const board = this.state.board
        board[row][col] = this.state.queue.shift()
        this.state.queue.push({ type: TileHelper.generateRandomTile() })
        this.setState({ board, queue: this.state.queue })
    },

    onNextClick() {
        const gooPosition = this.state.gooPosition
        const nextGooPosition = TileHelper.getNextPosition(
            gooPosition.row, gooPosition.col, gooPosition.exitDirection)

        if (TileHelper.isOutOfBounds(nextGooPosition.row, nextGooPosition.col)) {
            console.log('game over, out of bounds')
            return
        }

        const nextGooTile = this.state.board[nextGooPosition.row][nextGooPosition.col].type
        const enterDirection = TileHelper.getOppositeDirection(gooPosition.exitDirection)
        if (nextGooTile.openings.indexOf(enterDirection) === -1) {
            console.log('game over, next tile does not have opening')
            return
        }
        nextGooPosition.exitDirection = TileHelper.getExitDirection(nextGooTile, enterDirection)

        this.setState({ gooPosition: nextGooPosition })
    },

    render() {
        return <div>
            <Queue tiles={ this.state.queue } />
            <Board board={ this.state.board }
                   onTileClick={ this.onTileClick }
                   nextTile={ this.state.queue[0] } />
            <ul>
                <li>Current goo position:</li>
                <li>Row: { this.state.gooPosition.row }</li>
                <li>Col: { this.state.gooPosition.col }</li>
                <li>Exit Direction: { this.state.gooPosition.exitDirection }</li>
            </ul>
            <button onClick={ this.onNextClick }>Next</button>
        </div>
    }
})
