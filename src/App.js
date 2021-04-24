import React, { useState, useEffect } from "react";
import Question from './Question';
import { Input, Button } from '@material-ui/core';

/*class App {
    onChangeValue(event) {
        console.log(event.target.value);
    }

    render() {
        return (
            <div onChange={this.onChangeValue}>
            <input type="radio" value="Yes" name="yn" /> Yes
            <input type="radio" value="No" name="yn" /> No
        </div>
        );

    }
}*/

export default function App() {
    const [questions, setQuestions] = useState([]);
    const [numQuestions, setNumQuestions] = useState(10);
    const [numAnswered, setNumAnswered] = useState(0);

    const handleChange = (event) => {
        setNumQuestions(event.target.value);
    }

    const fetchQuestions = () => {
        fetch("https://opentdb.com/api.php?amount=" + numQuestions)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                //setQuestions(res.results);
                const questions = res.results.map((question) => {
                    let answers;

                    if (question.type === "boolean") {
                        answers = ["True", "False"];
                    } else {
                        answers = [...question.incorrect_answers];
                        const rand = Math.floor(Math.random() * 3);

                        answers.splice(rand, 0, question.correct_answer);
                    }
                    return { ...question, answers };
                });
                setQuestions(questions);
            });
        setNumAnswered(0);
    }

    if (questions.length === 0) {
        return (
            <div>
                <Input type="number" value={numQuestions} onChange={handleChange} />
                <Button onClick={fetchQuestions}>Go</Button>
            </div>
        );
    }

    return (
        <div>
            <h1>Hey, Launch!</h1>
            {questions.map((question) => (
                <Question
                    question={question}
                    setNumAnswered={setNumAnswered}
                    key={question.question}
                ></Question>
            ))}

            {numAnswered == parseInt(numQuestions) && (
                <Button onClick={fetchQuestions}>More Questions</Button>
            )}
        </div>
    );
}