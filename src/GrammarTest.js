import React, { Component } from 'react';

class CountdownBar extends Component {
    render() {
        return (
            <div>countdown bar</div>
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

        //  set states for auto-rendering
        this.state = {
            currentQuestion: this.getQuestion(),
            testFinished: false
        }

        // prepare for callback
        this.checkAnswer = this.checkAnswer.bind(this);
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
                <CountdownBar />
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
