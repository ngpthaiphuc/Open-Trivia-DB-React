import React, { useState, useEffect } from "react";
import { Button } from '@material-ui/core';

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
    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=3&type=multiple")
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setQuestions(res.results);
            });
    }, []);

    /*handleButtonInput = event => {
        console.log(event.target.value);
    };*/
    //console.log(document.getElementById("question"));

    return (
        <div>
            
            <h1>Hey, Launch!</h1>
            {questions.map((question) => (
                <div>
                    <h1 id="question">{question.question}</h1>

                    <Button id="right" variant="contained" color="default" onClick={() => {
                        alert('Correct');
                    }}>{question.correct_answer}</Button>
                    <Button id="wrong1" variant="contained" color="default" onClick={() => {
                        alert('Wrong');
                    }}>{question.incorrect_answers[0]}</Button>
                    <Button id="wrong2" variant="contained" color="default" onClick={() => {
                        alert('Wrong');
                    }}>{question.incorrect_answers[1]}</Button>
                    <Button id="wrong3" variant="contained" color="default" onClick={() => {
                        alert('Wrong');
                    }}>{question.incorrect_answers[2]}</Button>
                </div>
            ))}
        </div>
    );
}