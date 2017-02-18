import React, { Component } from 'react';
import './App.css';
import GrammarTest from './GrammarTest.js';

var QUESTIONS = [
    {
        category: 'A',
        sentence_correct: 'They are hungry',
        sentence_incorrect: 'They is hungry',
        level: 1,
        options: ["is","are"]
    },
    {
        category: 'A',
        sentence_correct: 'He is tired',
        sentence_incorrect: 'He are tired',
        level: 1,
        options: ["is","are"]
    },
    {
        category: 'B',
        sentence_correct: 'We are friends',
        sentence_incorrect: 'We is friends',
        level: 1,
        options: ["is","are"]
    },
    {
        category: 'B',
        sentence_correct: 'My friends are the best',
        sentence_incorrect: 'My friends is the best',
        level: 1,
        options: ["is","are"]
    }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="ui menu">
          <div className="header item">Level Test</div>
          <div className="right menu">
            <a className="item">Log out</a>
          </div>
        </div>
        <GrammarTest questions={QUESTIONS} />
      </div>
    );
  }
}

export default App;
