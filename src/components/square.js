import React, { Component } from 'react'
import './square.scss'

class Square extends Component {

  render () {
    let player = ''
    if(typeof this.props.player === 'boolean') {
      player = this.props.player ? 'O' : 'X'
    }

    return (
      <div className="square" onClick={() => this.props.setPlayer(this.props.row, this.props.column)}>
      {player}
      </div>
    )
  }
}

export default Square
