import React, { Component } from 'react';
import GrammarTest from './GrammarTest.js';

class CountdownBar extends Component {
    render() {
        return (
            <div>countdown bar</div>
        );
    }
}

class QuestionText extends Component {
    render() {
        return (
            <div><h1>{this.props.text}</h1></div>
        );
    }
}

class UserInput extends Component {
    render() {
        return (
            <div>
                <button onClick={() => this.props.callback(0)}>O</button>
                <button onClick={() => this.props.callback(1)}>X</button>
            </div>
        );
    }
}

class TestBox extends Component {
    constructor(props) {
        super(props);
        this.test = new GrammarTest();
        this.qText = this.test.getQuestion();
    }
    render() {

        return (
            <div className="container" id="question-box">
                <CountdownBar />
                <QuestionText text={this.test.getQuestion()}/>
                <UserInput callback={this.test.checkAnswer}/>
            </div>
        );
    }
}

export default TestBox;
