import React, { Component } from 'react';
import Square from './square.js'
import './board.scss'

class Board extends Component  {
  constructor (props) {
    super(props)
    this.state = {
      currentPlayer: true,
      firstPlayer: true,
      secondPlayer: false,
      noPlayer: null,
      board: null,
      error: false,
      winner: null
    }
  }

  componentWillMount () {

    let board = new Array(3)

    for(let i = 0; i < board.length; i++) {
      board[i] = new Array(3)
    }

    this.setState({
      board: board
    })
  }

  competitorPlays () {

  }

  checkForWinner () {
    // TODO check wether board is filled
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
        this.setState({ winner: board[2][0]})
        return
      }
    }

  }

 setPlayer (row, column) {
    let currentPlayer = this.state.currentPlayer
    let board = this.state.board
    let winner = this.state.winner

    if(winner == null){
      if(board[row][column] == null) {
        board[row][column] = currentPlayer
        this.setState({
          board: board,
          currentPlayer: !currentPlayer,
          error: false
        })
      } else {
        this.setState({
          error: true
        })
      }

      if(this.props.competitor) this.competitorPlays()
      this.checkForWinner()
    }

  }

  getPlayer () {
    return this.state.currentPlayer ? 'X' : 'O'
  }

  render() {
    let board = this.state.board
    let winner = this.state.winner
    let error

    if(winner != null) winner = (<div className="won">Spieler {this.getPlayer()} gewinnt</div>)
    if(this.state.error) error = (<div className='error'>Dieses Feld ist schon besetzt.</div>)

    return (
      <div className="board">
          <h1 className={(winner != null ? 'winner' :'nowinner')}>Tic Tac Toe</h1>
          <div className="info">
              <div className={"current_player "+(winner != null ? 'winner' :'nowinner')}>Aktueller Spieler: {this.getPlayer()}</div>
              {error}
              {winner}
          </div>
          <div className={'board_plate '+(winner != null ? 'winner' :'nowinner')}>
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
          </div>
      </div>
    )
  }
}

export default Board;
