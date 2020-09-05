import React, { useState, useEffect } from 'react'

import "./CreateQuiz.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const CreateQuiz = () => {

    const [questions, setQuestions] = useState([])
    const [answersTemp, setAnswersTemp] = useState([])
    const [quizName, setQuizName] = useState(null)
    const [inputStage, setInputStage] = useState(0)
    const [correctAnswer, setCorrectAnswer] = useState(0);

    const [formData, setFormData] = useState({
        quizTitle: "",
        quizQuestion: "",
        quizAnswer: ""
    });


    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const setQuizGoNext = () => {
        setInputStage(1);
        setQuizName(formData.quizTitle);
    }

    const addAnswer = () => {
        if (!answersTemp.includes(formData.quizAnswer)) {
            setAnswersTemp([...answersTemp, formData.quizAnswer]);
            setFormData({ ...formData, quizAnswer: "" })
        }
    }

    const removeAnswer = (answer) => {
        if (answersTemp.indexOf(answer) < correctAnswer) {
            setCorrectAnswer(prevVal => prevVal - 1);
        }
        let newAnswers = answersTemp;
        newAnswers.splice(newAnswers.indexOf(answer), 1)
        setAnswersTemp([...newAnswers]);
    }

    const newQuestion = () => {
        //add question object to array state
        setQuestions([...questions,
        {
            question: formData.quizQuestion,
            answers: answersTemp,
            correct: answersTemp[correctAnswer]
        }])

        //reset form data
        setFormData({ ...formData, quizQuestion: "", quizAnswer: "" })

        //reset temp states to default
        setCorrectAnswer(0);
        setAnswersTemp([]);

        //reset input stage to add new question
        setInputStage(1);
    }

    useEffect(() => {
        if (correctAnswer >= answersTemp.length) {
            setCorrectAnswer(0);
        }
    }, [answersTemp])


    const createQuiz = async (e) => {
        e.preventDefault();
        try {
            const body = {
                name: quizName,
                questions: questions
            };
            await fetch("/api/quizard/createquiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }).then(answer => answer.json())
                .then(data => {
                    if (data.success === 1) {
                        window.location.href = "/";
                    }
                });
        }
        catch (err) {
            console.error(err);
        }
    }

    if (inputStage === 0) {
        return (
            <div className="container">
                <div className="form-container">
                    <h2>CREATE QUIZ</h2>
                    <form>
                        <div className="input-row-container">
                            <p className="input-label">Enter Quiz name</p>
                            <input
                                name="quizTitle"
                                type="text"
                                value={formData.quizTitle}
                                className="form-release-input"
                                onChange={changeHandler}
                            />
                        </div>
                        <br />
                        <button onClick={() => setQuizGoNext()}>Continue</button>
                    </form>
                </div>
            </div>
        )
    }
    if (inputStage === 1) {
        return (
            <div className="container">
                <div className="form-container">
                    <h2>CREATE QUIZ</h2>
                    <p className="quiz-title">{quizName}</p>
                    <form onSubmit={createQuiz}>
                        <div className="input-row-container">
                            <p className="input-label">Enter Quiz question</p>
                            <input
                                name="quizQuestion"
                                type="text"
                                value={formData.quizQuestion}
                                className="form-release-input"
                                onChange={changeHandler}
                            />
                        </div>
                        <br />
                        <button onClick={() => setInputStage(2)}>Continue</button><br />
                        {questions.length > 0 && <button type="submit">Finish</button>}
                    </form>

                </div>
            </div >
        )
    }
    if (inputStage === 2) {
        return (
            <div className="container">
                <div className="form-container">
                    <h2>CREATE QUIZ</h2>
                    <p className="quiz-title">{quizName}</p>
                    <p className="quiz-question">{questions.length + 1}. {formData.quizQuestion}</p>
                    {answersTemp.map((a, index) => <div key={index} className={correctAnswer === index ? "added-answer correct-answer" : "added-answer"}>
                        <div onClick={() => setCorrectAnswer(index)}>{a}</div>
                        <div className="remove-answer" onClick={() => removeAnswer(a)}><FontAwesomeIcon icon={faTrash} /></div></div>)}
                    <form onSubmit={createQuiz}>
                        <div className="input-row-container">
                            <p className="input-label">{answersTemp.length === 0 ? "Enter an answer" : "Add another answer"}</p>
                            <input
                                name="quizAnswer"
                                type="text"
                                value={formData.quizAnswer}
                                className="form-release-input"
                                onChange={changeHandler}
                            />
                        </div>
                        <br />
                        <button type="button" onClick={() => addAnswer()}>Add Answer</button><br />
                        {answersTemp.length > 1 && <><button onClick={() => newQuestion()}>Add Question</button><br /></>}
                    </form>

                </div>
            </div>
        )
    }


}

export default CreateQuiz
