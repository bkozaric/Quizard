import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import "./TakeQuiz.css"

const TakeQuiz = (props) => {

    const [questions, setQuestions] = useState([]);

    const [currentQuestion, setCurrentQuestion] = useState(null)

    const [answers, setAnswers] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([])

    const [quizFinished, setQuizFinished] = useState(false)

    const [trackScore, setTrackScore] = useState({ correct: 0, wrong: 0 })

    //fetch questions
    const fetchQuestions = async () => {
        try {
            const response = await fetch("/api/quizard/questions/" + props.match.params.id);
            const questionsJson = await response.json();
            setQuestions(questionsJson);
        }
        catch (err) {
            console.error(err);
        }
    }

    //new question loaded, fetch answers for that question
    const fetchAnswers = async () => {
        try {
            const response = await fetch("/api/quizard/answers/" + questions[currentQuestion].id);
            const answersJson = await response.json();
            setAnswers(answersJson);
        }
        catch (err) {
            console.error(err);
        }
    }

    //the quiz has ended, fetch correct answers
    const fetchCorrectAnswers = async () => {
        try {
            const response = await fetch("/api/quizard/correctanswers/" + props.match.params.id);
            const answersJson = await response.json();
            setCorrectAnswers(answersJson);
        }
        catch (err) {
            console.error(err);
        }
    }

    //question has been answered, go to next question OR if last question end the quiz
    //also check if answer is correct and update score tracker accordingly
    const nextQuestion = async (answerId, answer) => {
        setAnswers([]);
        setUserAnswers([...userAnswers, answer]);
        try {
            const response = await fetch("/api/quizard/iscorrect/" + answerId);
            const isCorrectJson = await response.json();
            if (isCorrectJson[0].isCorrect) {
                setTrackScore({ ...trackScore, correct: trackScore.correct + 1 })
            }
            else {
                setTrackScore({ ...trackScore, wrong: trackScore.wrong + 1 })
            }
        }
        catch (err) {
            console.error(err);
        }
        if (currentQuestion + 1 !== questions.length) {
            setCurrentQuestion(prevVal => prevVal + 1);
        }
        else {
            setQuizFinished(true)
        }
    }

    //once the site is loaded call the fetch questions function
    useEffect(() => {
        fetchQuestions();
    }, [])

    //once the questions have been fetched, set the current question to 0 and start the quiz
    useEffect(() => {
        if (currentQuestion) {
            setCurrentQuestion(0);
        }
        else {
            setCurrentQuestion(prevVal => prevVal + 1);
        }

    }, [questions])

    //the current question has changed, load answers for that question
    useEffect(() => {
        fetchAnswers();
    }, [currentQuestion])

    //last question has been answered, end the quiz
    useEffect(() => {
        fetchCorrectAnswers();
    }, [quizFinished])


    if (quizFinished) {
        return (
            <div className="container">
                <div className="form-container">
                    <h2>RESULTS</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                </th>
                                <th>
                                    Question
                                </th>
                                <th>
                                    Correct answer
                                </th>
                                <th>
                                    Your answer
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {correctAnswers.map((ca, index) =>
                                <tr key={index}>
                                    <td className={ca.answer !== userAnswers[index] ? "td-incorrect-answer td-indicator" : "td-correct-answer td-indicator"}>
                                        {ca.answer !== userAnswers[index] ? <FontAwesomeIcon icon={faTimesCircle} /> : <FontAwesomeIcon icon={faCheckCircle} />}
                                    </td>
                                    <td>
                                        {questions[index].question}
                                    </td>
                                    <td className="td-correct-answer">
                                        {ca.answer}
                                    </td>
                                    <td className={ca.answer !== userAnswers[index] ? "td-incorrect-answer" : "td-correct-answer"}>
                                        {userAnswers[index]}
                                    </td>
                                </tr>)}
                        </tbody>
                    </table>

                    <div className="total-score-container">
                        <p className="total-score-correct">
                            Correct answers: {trackScore.correct}/{questions.length} - {((trackScore.correct / questions.length) * 100).toFixed(2)}%
                        </p>
                        <p className="total-score-incorrect">
                            Incorrect answers: {trackScore.wrong}/{questions.length} - {((trackScore.wrong / questions.length) * 100).toFixed(2)}%
                        </p>
                    </div>

                    <div className="next-action-container">
                        <div onClick={() => window.location.href = "/pickquiz"} className="pick-different-quiz">Take a different quiz</div>
                        <div onClick={() => window.location.reload()} className="restart-quiz">Try again</div>
                    </div>

                </div>
            </div>
        )
    }

    if (answers.length > 0) {
        return (
            <div className="container">
                <div className="form-container">
                    <h1 className="current-question">{questions[currentQuestion].question}</h1>
                    {answers.map((answer) => <p onClick={() => nextQuestion(answer.id, answer.answer)} className="possible-answer" key={answer.id}>{answer.answer}</p>)}
                    <p className="current-question-number-total">Question {currentQuestion + 1}/{questions.length}</p>
                </div>
            </div>
        )
    }

    return null;
}

export default TakeQuiz
