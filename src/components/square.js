import React, { Component } from 'react'
import '../App.scss'

class Square extends Component {

  render () {
    return (
      <div className="square" onClick={this.props.setPlayer} />
    )
  }
}

export default Square
