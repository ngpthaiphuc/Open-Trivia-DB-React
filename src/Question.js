//import App from './App'
import React, { useState } from "react";
import { Button } from '@material-ui/core';

export default function Question({ question, setNumAnswered }) {
    /*const [flagCorrect, setFlagCorrect] = useState(true);
    const [flagWrong1, setFlagWrong1] = useState(true);
    const [flagWrong2, setFlagWrong2] = useState(true);
    const [flagWrong3, setFlagWrong3] = useState(true);*/

    const [isAnswered, setIsAnswered] = useState(false);

    const handleClick = () => {
        setIsAnswered(true);
        setNumAnswered((prevVal) => {
            return prevVal + 1;
        });
    }

    const buttonColor = (answer) => {
        if (!isAnswered)
            return "";
        if (answer === question.correct_answer)
            return "green";
        else
            return "red";
    }

    function decodeHTML(str) {
        /*var entities = {
            '&lt;': '<',
            '&gt;': '>',
            '&amp;': '&',
            '&quot;': '\"',
            '&apos;': '\'',
            '&#039;': '\'',
            '&cent;': '¢',
            '&pound;': '£',
            '&yen;': '¥',
            '&euro;': '€',
            '&copy;': '©',
            '&reg;': '®'
        };
        return str.split('').map(function (char) {
            return entities[char] || char;
        }).join('');
        */
        //Thanks Youtube
        let parser = new DOMParser().parseFromString(str, "text/html")

        return parser.documentElement.textContent;
    }

    return (
        <div>
            <h1 id="question">{decodeHTML(question.question)}</h1>

            {question.answers.map((answer) => (
                <Button
                    variant="contained"
                    style={{ background: buttonColor(answer) }}
                    onClick={handleClick}
                    disabled={isAnswered}
                    key={answer}
                >{decodeHTML(answer)}</Button>
            ))}
        </div>
    );
    /*
    <Button id="right" variant="contained" style={{ background: flagCorrect ? "" : "green" }} onClick={() => {
        //alert('Correct');
        setFlagCorrect(!flagCorrect);
    }}>{decodeHTML(question.correct_answer)}</Button>

    <Button id="wrong1" variant="contained" style={{ background: flagWrong1 ? "" : "red" }} onClick={() => {
        //alert('Wrong');
        setFlagWrong1(!flagWrong1);
    }}>{decodeHTML(question.incorrect_answers[0])}</Button>

    <Button id="wrong2" variant="contained" style={{ background: flagWrong2 ? "" : "red" }} onClick={() => {
        //alert('Wrong');
        setFlagWrong2(!flagWrong2);
    }}>{decodeHTML(question.incorrect_answers[1])}</Button>

    <Button id="wrong3" variant="contained" style={{ background: flagWrong3 ? "" : "red" }} onClick={() => {
        //alert('Wrong');
        setFlagWrong3(!flagWrong3);
    }}>{decodeHTML(question.incorrect_answers[2])}</Button>
    */
}