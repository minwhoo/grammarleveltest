import React, { Component } from 'react';
import ProgressBar from 'progressbar.js';

class CountdownBar extends Component {
    componentDidMount() {
        this.bar = new ProgressBar.Line('#timer', {
            color: '#aaa',
            trailColor: '#fff',
            // easing: 'easeInOut'
        });
        this.startCountdown();
    }

    startCountdown(timeInSeconds=2) {
        this.bar.set(1);
        this.bar.animate(0, {
            duration: timeInSeconds * 1000
        }, this.props.onTimeout);
    }

    render() {
        return (
            <div id="timer"></div>
        );
    }
}

function  QuestionText(props) {
    return <div><h1>{props.text}</h1></div>
};

function UserInput(props) {
    return (
        <div>
            <button onClick={() => props.callback(0)}>O</button>
            <button onClick={() => props.callback(1)}>X</button>
        </div>
    );
};

class GrammarTest extends Component {
    constructor(props) {
        super(props)
        // variables to check questions and answers
        this.questions = this.props.questions;
        this.correctAnswer = undefined;
        this.count = 0;
        this.answers = [];

        //  set states for auto-rendering
        this.state = {
            currentQuestion: this.getQuestion(),
            testFinished: false
        }

        // prepare functions for callback
        this.checkAnswer = this.checkAnswer.bind(this);
        this.onTimeout = this.onTimeout.bind(this);
    }

    getQuestion() {
        let question = this.questions[this.count];
        if ( Math.random() < 0.5 ) {
            this.correctAnswer = 0;
            return question.sentence_correct;
        }
        else {
            this.correctAnswer = 1;
            return question.sentence_incorrect;
        }
    }

    onTimeout() {
        console.log("Timeout!!!");
        this.getNextQuestion();
    }

    checkAnswer(answer) {
        if (answer === this.correctAnswer) {
            console.log("Correct!!!");
        }
        else {
            console.log("Incorrect!!!");
        }

        this.getNextQuestion();
    }

    getNextQuestion() {
        this.count++;
        if (this.count < this.questions.length) {
            const text = this.getQuestion();
            this.setState({
                currentQuestion: text
            });
            this.refs.timer.startCountdown();
        }
        else {
            this.setState({
                testFinished: true
            });
        }
    }

    render() {
        // <QuestionText text={this.getQuestion()}/>
        const testFinished = this.state.testFinished;

        return (
            <div className="container">
            {!testFinished ? (
                <div>
                <CountdownBar ref="timer" onTimeout={this.onTimeout} />
                <QuestionText text={this.state.currentQuestion} />
                <UserInput callback={this.checkAnswer} />
                </div>
            ) : (
                <h1>Test Finished!</h1>
            )}
            </div>
    );
    }
}

export default GrammarTest;
