import React, { Component } from 'react';
import Square from './square.js'
import './board.scss'

class Board extends Component  {
  constructor (props) {
    super(props)
    this.state = {
      available: null,
      board: null,
      currentPlayer: true,
      error: false,
      firstPlayer: true,
      noPlayer: null,
      over: false,
      secondPlayer: false,
      winner: null
    }
  }

  componentWillMount () {
    let board = new Array(3)
    let available = new Array(9)

    for(let i = 0; i < board.length; i++) {
      board[i] = new Array(3)
    }

    for(let i = 0; i < available.length; i++) {
      available[i] = i
    }

    this.setState({
      available: available,
      board: board
    })
  }

  competitorPlays () {
    let availableLength = this.state.availableLength
    let pos = Math.random() * availableLength

  /*  switch (pos) {
      case < 3:
        setPlayer(1, pos);
        break;
      case < 6:
        setPlayer(2, pos-3);
        break;
      case < 9:
        setPlayer(3, pos-6);
        break;

    }
    */
  }

  checkForWinner () {
    if(this.state.available.length === 0) this.setState({ over: true })
    else {
      let board = this.state.board

      for(let i = 0; i < board.length; i++) {
        // horizontal
        if(board[i][0] != null && board[i][0] === board[i][1]) {
          if(board[i][1] === board[i][2]) {
            this.setState({ winner: board[i][0]})
            return
          }
        }

        // vertical
        if(board[0][i] != null && board[0][i] === board[1][i]) {
          if(board[0][i] === board[2][i]) {
            this.setState({ winner: board[0][i]})
            return
          }
        }
      }

      // diagonal left to right
      if(board[0][0] != null && board[0][0] === board[1][1]) {
        if (board[0][0] === board[2][2]) {
          this.setState({ winner: board[0][0]})
          return
        }
      }

      // diagonal right to left
      if(board[2][0] != null && board[2][0] === board[1][1]) {
        if (board[2][0] === board[0][2]) {
          this.setState({ winner: board[2][0], over: true })
          return
        }
      }
    }
  }

 setPlayer (row, column) {
   let winner = this.state.winner
   let over = this.state.over

   if(winner == null && over === false){
     let available = this.state.available
     let board = this.state.board
     let currentPlayer = this.state.currentPlayer

     if(board[row][column] == null) {
        board[row][column] = currentPlayer
        //available.slice(available.findIndex(row * column), 1)
        this.setState({
          available: available,
          board: board,
          currentPlayer: !currentPlayer,
          error: false
        })
      } else {
        this.setState({
          error: true
        })
      }

      //if(this.props.competitor) this.competitorPlays()
      this.checkForWinner()
    }

  }

  getPlayer () {
    return this.state.currentPlayer ? 'X' : 'O'
  }

  render() {
    console.log(this.state)
    let board = this.state.board
    let winner = this.state.winner
    let error = this.state.error
    let over = this.state.over

    if(winner != null) winner = (<div>Das Spiel wurde gewonnen von Spieler {this.getPlayer()} </div>)
    if(error) error = (<div className='error'>Dieses Feld ist schon besetzt.</div>)
    if(winner == null && over) over = (<div>Das Spielfeld ist voll und es gibt keinen Gewinner. </div>)

    // TODO
    // disable (class for) field when over or won

    return (
      <div className="board">
        <div className="board__row">
          <Square row='0' column='0' setPlayer={this.setPlayer.bind(this)} player={board[0][0]} />
          <Square row='0' column='1' setPlayer={this.setPlayer.bind(this)} player={board[0][1]} />
          <Square row='0' column='2' setPlayer={this.setPlayer.bind(this)} player={board[0][2]} />
        </div>
        <div className="board__row">
          <Square row='1' column='0' setPlayer={this.setPlayer.bind(this)} player={board[1][0]} />
          <Square row='1' column='1' setPlayer={this.setPlayer.bind(this)} player={board[1][1]} />
          <Square row='1' column='2' setPlayer={this.setPlayer.bind(this)} player={board[1][2]} />
        </div>
        <div className="board__row">
          <Square row='2' column='0' setPlayer={this.setPlayer.bind(this)} player={board[2][0]} />
          <Square row='2' column='1' setPlayer={this.setPlayer.bind(this)} player={board[2][1]} />
          <Square row='2' column='2' setPlayer={this.setPlayer.bind(this)} player={board[2][2]} />
        </div>
        <div>aktueller Spieler: {this.getPlayer()}</div>
        {error}
        {winner}
      </div>
    )
  }
}

export default Board;
