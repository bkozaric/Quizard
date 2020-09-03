import React, { useState, useEffect } from 'react'

import Quiz from "./Quiz"

const PickQuiz = () => {
    const [quizes, setQuizes] = useState([])

    const fetchQuizes = async () => {
        try {
            const response = await fetch("/api/quizard/quizes");
            const quizesJson = await response.json();

            setQuizes(quizesJson)

            console.log(quizesJson);

        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchQuizes();
    }, [])
    return (
        <div className="container">
            {quizes.map((q, index) => <Quiz key={index} qid={q.quizId} title={q.quizTitle} qcount={q.questionCount} />)}
        </div>
    )
}

export default PickQuiz
