import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GrammarTest from './GrammarTest.js';

var QUESTIONS = [
    {
        category: 'plural',
        sentence_correct: 'They are hungry',
        sentence_incorrect: 'They is hungry',
        level: 1
    },
    {
        category: 'plural',
        sentence_correct: 'He is tired',
        sentence_incorrect: 'He are tired',
        level: 1
    },
    {
        category: 'plural',
        sentence_correct: 'We are friends',
        sentence_incorrect: 'We is friends',
        level: 1
    },
    {
        category: 'plural',
        sentence_correct: 'My friends are the best',
        sentence_incorrect: 'My friends is the best',
        level: 1
    }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <h2>Rury's English Level Test</h2>
        </div>
        <GrammarTest questions={QUESTIONS} />
      </div>
    );
  }
}

export default App;
