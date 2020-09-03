import React, { useState, useEffect } from 'react'

import "./TakeQuiz.css"

const TakeQuiz = (props) => {

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null)

    const [trackScore, setTrackScore] = useState({ correct: 0, wrong: 0 })

    const fetchQuestions = async () => {
        try {
            const response = await fetch("/api/quizard/questions/" + props.match.params.id);
            const questionsJson = await response.json();

            setQuestions(questionsJson);

            console.log(questionsJson);

        }
        catch (err) {
            console.error(err);
        }
    }

    const fetchAnswers = async () => {
        try {
            const response = await fetch("/api/quizard/answers/" + questions[currentQuestion].id);
            const answersJson = await response.json();

            setAnswers(answersJson);

            console.log(answersJson);

        }
        catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        fetchQuestions();
    }, [])

    useEffect(() => {
        if (currentQuestion === null) {
            setCurrentQuestion(0);
        }
        else {
            setCurrentQuestion(prevVal => prevVal + 1);
        }

    }, [questions])

    useEffect(() => {
        fetchAnswers();
    }, [currentQuestion])


    if (answers.length > 0) {
        return (
            <div className="container">
                <div className="form-container">
                    <h1 className="current-question">{questions[currentQuestion].question}</h1>
                    {answers.map((answer) => <p className="possible-answer" key={answer.id}>{answer.answer}</p>)}
                    <p>Question {currentQuestion + 1}/{questions.length}</p>
                </div>
            </div>
        )
    }
    return null;
}

export default TakeQuiz
