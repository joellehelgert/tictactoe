import React, { Component } from 'react';
import logo from './logo.svg';
import Board from './components/board.js'

import './App.scss'

class App extends Component {
  constructor (props) {
    super(props)
    this.child = React.createRef();
    this.state = {
      competitor: true
    }
  }

  changePlayerMode() {
    this.setState({ competitor: !this.state.competitor })
  }

  render() {
    return (
      <div className='game'>
        <Board ref={this.child} competitor={this.state.competitor} newgame={this.state.newgame} />
          <div className="competitor">Ohne Computergegener spielen | Mit Computergegener spielen</div>
          <label className="switch">
            <input type='checkbox' onChange={this.changePlayerMode.bind(this)} checked={this.state.competitor} />
            <span className="slider"></span>
          </label>
      </div>
    )
  }
}

export default App;
