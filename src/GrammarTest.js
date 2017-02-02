class GrammarTest {
    constructor() {
        this.questions = [
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
        }
        ]

        this.correctAnswer = undefined;
        this.count = 0;
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
        if (answer == this.correctAnswer) {
            console.log("Correct!!!");
        }
        else {
            console.log("Incorrect!!!");
        }

    }

    getNextQuestion() {
        this.count++;
        if (this.count < this.questions.length) {
            this.getQuestion();
        }
        else {
            return false;
        }
    }
}

export default GrammarTest;
