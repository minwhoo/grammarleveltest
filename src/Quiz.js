import React  from 'react';
import './Quiz.css';

/**
 * Boilerplate class for all quizzes
 *
 * Quiz must implement three functions:
 *  - setTextAndAnswer(): must set this.text and this.answer
 *  - setFeedback(): must set this.feedback
 *  - checkAnswer(answer): must be called on enter button and must call this.callback at the end
 */
class Quiz extends React.Component {
    constructor(props) {
        super(props);
         
        this.callback = props.onResponse;
        this.answer = undefined;

        this.checkAnswer = this.checkAnswer.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    //  convenience getter functions for question
    get sentence_correct() {
        return this.props.question.sentence_correct;
    }
    get sentence_incorrect() {
        return this.props.question.sentence_incorrect;
    }
    get options() {
        return this.props.question.options;
    }

    get text() {
        return <h1>question text</h1>;
    }
    get feedback() {
        return <button>Okay</button>;
    }

    checkAnswer(answer) {
        //  checks answer
    }
    handleKeyPress(e) {
        //  handles keypress
    }

    findWrongWord() {
        const words_correct = this.sentence_correct.split(" ");
        const words_incorrect = this.sentence_incorrect.split(" ");
        let incorrectWord;
        let correctWord;
        let wrongIndex;
        words_incorrect.forEach( (word, index) => {
            if (words_correct[index] !== word) {
                incorrectWord = word;
                correctWord = words_correct[index];
                wrongIndex = index;
            }
        });

        return {
            words_correct: words_correct,
            words_incorrect: words_incorrect,
            correct_word: correctWord,
            incorrect_word: incorrectWord,
            index: wrongIndex
        };
    }

    render() {
        return (
            <div className="Quiz">
              <div className="quiz-text">{this.text}</div>
              <div className="feedback">{this.feedback}</div>
            </div>
        );
    }
}

class OXQuiz extends Quiz {
    get text() {
        let text;
        if (Math.random() < 0.5) {
            text = this.sentence_correct;
            this.answer = 0;
        } else {
            text = this.sentence_incorrect;
            this.answer = 1;
        }
        return <h1>{text}</h1>;
    }

    get feedback() {
        return (
            <div className="ui grid">
            <div className="four wide column"></div>
            <div className="four wide column">
            <button className="ui icon button" onClick={() => this.checkAnswer(0)}>
                <i className="radio large icon" />
            </button>
            </div>
            <div className="four wide column">
            <button className="ui icon button" onClick={() => this.checkAnswer(1)}>
                <i className="remove large icon" />
            </button>
            </div>
            <div className="four wide column"></div>
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(e) {
        if (e.keyCode === 37) {
            this.checkAnswer(0);
        } else if (e.keyCode === 39) {
            this.checkAnswer(1);
        }
    }

    checkAnswer(answer) {
        console.log(answer);
        let response;
        if (this.answer === answer) {
            if (this.answer === 0) {
                response = 1;
            } else {
                response = 2;
            }
        } else {
            if (this.answer === 0) {
                response = 3;
            } else {
                response = 4;
            }
        }
        this.callback(response);
    }
}

class FindWrongBlockQuiz extends Quiz {
    get text() {
        const wrongResults = this.findWrongWord();
        this.answer = wrongResults.index;

        const wordButtons = wrongResults.words_incorrect.map( (word, index) => 
            <button className="ui big basic button wordbutton" key={index.toString()} onClick={() => this.checkAnswer(index)}>{word}</button>
        );
        return(
            <div>
            {wordButtons}
            </div>
        );
    }

    get feedback() {
        return undefined;
    }

    checkAnswer(answer) {
        let response;
        if (this.answer === answer) {
            response = 1;
        } else {
            response = this.sentence_incorrect.split(" ")[this.answer];
        }

        this.callback(response);
    }
}

class MultipleChoiceQuiz extends Quiz {
    get text() {
        const wrongResults = this.findWrongWord();
        this.answer = wrongResults.correct_word;

        const wordBlocks = wrongResults.words_incorrect.map( (word, index) => {
            let wordElement;
            if (index === wrongResults.index) {
                wordElement = <div className="ui steps"><div className="step">    </div></div>
            } else {
                wordElement = <h1>{word}</h1>;
            }
            return <div className="wordblock" key={index.toString()}>{wordElement}</div>;
        });
        return(
            <div>
            {wordBlocks}
            </div>
        );
    }
    get feedback() {
        const wordButtons = this.options.map( (word, index) => 
            <button className="ui big basic button wordbutton" key={index.toString()} onClick={() => this.checkAnswer(word)}>{word}</button>
        );
        return (
            <div>
            {wordButtons}
            </div>
        );
    }
    checkAnswer(answer) {
        let response;
        if (this.answer===answer) {
            response = 1;
        } else {
            response = answer;
        }

        this.callback(response);
    }
}

class FillBlankQuiz extends Quiz {
    get text() {
        const wrongResults = this.findWrongWord();
        this.answer = wrongResults.correct_word;

        const wordBlocks = wrongResults.words_incorrect.map( (word, index) => {
            let wordElement;
            if (index === wrongResults.index) {
                wordElement = <input ref={input => this.textInput = input} type="text" onKeyPress={this.handleKeyPress} placeholder="type" />;
            } else {
                wordElement = <h1>{word}</h1>;
            }
            return <div className="ui input wordblock" key={index.toString()}>{wordElement}</div>;
        });

        //  reset text input
        this.textInput.value = "";
        this.textInput.focus();

        return(
            <div>
            {wordBlocks}
            </div>
        );
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.checkAnswer(this.textInput.value);
        }
    }

    get feedback() {
        return <button className="ui primary button" onClick={() => this.checkAnswer(this.textInput.value)}>Enter</button>;
    }

    checkAnswer(answer) {
        let response;
        if (this.answer === answer) {
            response = 1;
        } else {
            response = answer;
        }

        this.callback(response);
    }
}

export { OXQuiz, FindWrongBlockQuiz, MultipleChoiceQuiz, FillBlankQuiz };
