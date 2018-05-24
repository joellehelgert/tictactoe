import React, { Component } from 'react';
import Square from './square.js'
import '../App.scss'

class Board extends Component  {
  constructor (props) {
    super(props)
    this.state = {
      firstPlayer: true,
      secondPlayer: false,
      noPlayer: null,
      board: null
    }
  }
  // will be executed after the rendering-process has finished
  componentDidMount () {
    console.log(this.state)
  }

  // will be called when state changes
  componentDidUpdate () {

  }

  componentWillMount () {
    let board = new Array(3)
    board.forEach((row) => {
      row = new Array(3)
    });

    this.setState({
      board: board
    })
  }

 setPlayer (row, column) {
   console.log(this) // undefined at the moment
   /*
    let currentPlayer, $board = this.getState('currentPlayer', 'board')
    $board[row][column]= currentPlayer
    this.setState({
      board: $board,
      currentPlayer: !currentPlayer
    })
    */
  }

  render() {
    return (
      <div className="board">
        <div className="row">
          <Square row='1' column='1' setPlayer={this.setPlayer} />
          <Square row='1' column='2' setPlayer={this.setPlayer} />
          <Square row='1' column='3' setPlayer={this.setPlayer} />
        </div>
        <div className="row">
          <Square row='2' column='1' setPlayer={this.setPlayer} />
          <Square row='2' column='2' setPlayer={this.setPlayer} />
          <Square row='2' column='3' setPlayer={this.setPlayer} />
        </div>
        <div className="row">
          <Square row='3' column='1' setPlayer={this.setPlayer} />
          <Square row='3' column='2' setPlayer={this.setPlayer} />
          <Square row='3' column='3' setPlayer={this.setPlayer} />
        </div>
      </div>
    )
  }
}

export default Board;
