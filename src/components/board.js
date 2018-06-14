import React, { Component } from 'react';
import Square from './square.js'
import './board.scss'

class Board extends Component  {
  constructor (props) {
    super(props);
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
    this.clear()
  }

  clear () {
    let board = new Array(3);
    let available = new Array(9);

    for(let i = 0; i < board.length; i++) {
      board[i] = new Array(3)
    }

    for(let i = 0; i < available.length; i++) {
      let row = 1;
      if(i > 3 && i < 6) row = 2;
      if(i > 6) row = 3;

      available[i] = i
    }

    this.setState({
      available: available,
      board: board,
      winner: null,
      over: false
    });
      console.log(this.state.winner);
  }

  competitorPlays () {
    let available = this.state.available;
    let availableLength = available.length - 1;
    let pos = Math.floor(Math.random() * availableLength);

    if(available[pos] < 3) this.setPlayer(available[pos], 0);
    else if(available[pos] < 6) this.setPlayer(available[pos]-3, 1);
    else if(available[pos] < 9) this.setPlayer(available[pos]-6, 2);
  }

  checkForWinner () {
    let over = this.state.available.length === 0
    let board = this.state.board

      for(let i = 0; i < board.length; i++) {
        // horizontal
        if(board[i][0] != null && board[i][0] === board[i][1]) {
          if(board[i][1] === board[i][2]) {
            this.setState({
              winner: board[i][0],
              over,
              currentPlayer: this.state.firstPlayer
            })
            return
          }
        }

        // vertical
        if(board[0][i] != null && board[0][i] === board[1][i]) {
          if(board[0][i] === board[2][i]) {
            this.setState({
              winner: board[0][i],
              over,
              currentPlayer: this.state.firstPlayer
            })
            return
          }
        }
      }

      // diagonal left to right
      if(board[0][0] != null && board[0][0] === board[1][1]) {
        if (board[0][0] === board[2][2]) {
          this.setState({
            winner: board[0][0],
            over,
            currentPlayer: this.state.firstPlayer
           })
          return
        }
      }

      // diagonal right to left
      if(board[2][0] != null && board[2][0] === board[1][1]) {
        if (board[2][0] === board[0][2]) {
          this.setState({
            winner: board[2][0],
            over,
            currentPlayer: this.state.firstPlayer
           })
          return
        }
      }

  }

 setPlayer (column, row) {
   let winner = this.state.winner
   let over = this.state.over

   if(winner == null && over === false){
     let available = this.state.available
     let board = this.state.board
     let currentPlayer = this.state.currentPlayer
     let posInAvailable = (row + 1 ) * 3 - (3 - column)
     if(board[column][row] == null) {
        board[column][row] = currentPlayer

        let found = available.findIndex((elem) => elem === posInAvailable);
        available.splice(found, 1);

        this.setState({
          available: available,
          board: board,
          currentPlayer: !currentPlayer,
          error: false
        }, () => {
          if(this.props.competitor && this.state.currentPlayer !== this.state.firstPlayer)
            setTimeout(() => this.competitorPlays(), 600)
          this.checkForWinner()
        })
      } else {
        this.setState({
          error: true
        })
      }
    }

  }

  getPlayer (player) {
    console.log(player)
    return player ? 'X' : 'O'
  }

  render() {

    if(this.state.newgame) this.componentWillMount()

    let board = this.state.board
    let winner = this.state.winner
    let error = this.state.error
    let over = this.state.over

    if(winner != null) winner = (<div className='won'>Spieler {this.getPlayer(!winner)} hat das Spiel gewonnen! </div>)
    if(error) error = (<div className='error'>Dieses Feld ist schon besetzt.</div>)
    if(winner == null && over) over = (<div className="over">Das Spielfeld ist voll und es gibt keinen Gewinner. </div>)


    // TODO
    // disable (class for) field when over or won

    return (
      <div className="board">
          <h1 className={(winner != null || over ? 'winner' :'nowinner')}>Tic Tac Toe</h1>
          <div className="info">
              <div className={"current_player "+(winner != null || over  ? 'winner' :'nowinner')}>Aktueller Spieler: {this.getPlayer(!this.state.currentPlayer)}</div>
              {error}
              {winner}
              {over}
          </div>
          <button className="restart" onClick={this.clear.bind(this)}>Spiel neustarten</button>

          <div className={'board_plate '+(winner != null || over  ? 'winner' :'nowinner')}>
              <div className="board__row">
                <Square row={0} column={0} setPlayer={this.setPlayer.bind(this)} player={board[0][0]} />
                <Square row={0} column={1} setPlayer={this.setPlayer.bind(this)} player={board[0][1]} />
                <Square row={0} column={2} setPlayer={this.setPlayer.bind(this)} player={board[0][2]} />
              </div>
              <div className="board__row">
                <Square row={1} column={0} setPlayer={this.setPlayer.bind(this)} player={board[1][0]} />
                <Square row={1} column={1} setPlayer={this.setPlayer.bind(this)} player={board[1][1]} />
                <Square row={1} column={2} setPlayer={this.setPlayer.bind(this)} player={board[1][2]} />
              </div>
              <div className="board__row">
                <Square row={2} column={0} setPlayer={this.setPlayer.bind(this)} player={board[2][0]} />
                <Square row={2} column={1} setPlayer={this.setPlayer.bind(this)} player={board[2][1]} />
                <Square row={2} column={2} setPlayer={this.setPlayer.bind(this)} player={board[2][2]} />
              </div>
          </div>
      </div>
    )
  }
}

export default Board;
