import React, { useState, useEffect } from 'react'

import Quiz from "./Quiz"

const ManageQuiz = () => {
    const [quizes, setQuizes] = useState([])

    const fetchQuizes = async () => {
        try {
            const response = await fetch("/api/quizard/");
            const quizesJson = await response.json();

            let quizTitles = [];
            let quizIds = [];

            quizesJson.map((q) => {
                if (!quizTitles.includes(q.quizTitle)) {
                    quizTitles.push(q.quizTitle);
                    quizIds.push(q.quizId);
                }
            })

            let quizAndQuestion = [];
            quizTitles.forEach((qt) => {
                let questions = []
                quizesJson.forEach(q => {
                    if (qt === q.quizTitle) {
                        questions.push(q.question);
                    }
                })
                quizAndQuestion.push({ quiz: qt, questions: questions, qid: quizIds[quizTitles.indexOf(qt)] })
            }
            )

            setQuizes(quizAndQuestion)


        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchQuizes();
    }, [])


    if (quizes.length > 0) {
        return (
            <div className="container">
                {quizes.map((q, index) => <Quiz key={index} id={q.qid} title={q.quiz} questions={q.questions} />)}
            </div>

        )
    }
    return null;

}

export default ManageQuiz
