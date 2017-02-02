import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TestBox from './TestBox.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <h2>Rury's English Level Test</h2>
        </div>
        <TestBox />
      </div>
    );
  }
}

export default App;
