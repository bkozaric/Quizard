import React, { useState, useEffect } from 'react'

import "./EditQuiz.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const EditQuiz = (props) => {

    const [questions, setQuestions] = useState([]);
    const [quizName, setQuizName] = useState(null);

    //fetch questions
    const fetchQuestions = async () => {
        try {
            const response = await fetch("/api/quizard/questions/" + props.match.params.id);
            const questionsJson = await response.json();
            setQuestions(questionsJson);
            if (questionsJson.length === 0) {
                window.location.href = "/manage";
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    const fetchQuizName = async () => {
        try {
            const response = await fetch("/api/quizard/quiz/" + props.match.params.id);
            const quizNameJson = await response.json();


            setQuizName(quizNameJson[0].title)

            console.log(quizNameJson);

        }
        catch (err) {
            console.error(err);
        }
    }

    const deleteQuestion = async (qid) => {
        await fetch("/api/quizard/question/" + qid, { method: "DELETE" })
            .then(answer => {
                if (answer.status === 200) {
                    fetchQuestions();
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchQuestions();
        fetchQuizName();
    }, [])

    if (quizName && questions.length > 0) {
        return (
            <div className="container">
                <div className="form-container">
                    <h2>EDIT QUIZ</h2>
                    <p className="quiz-title">{quizName}</p>
                    <table className="table-edit-question">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Edit</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, i) =>
                                <tr className="tr-edit-question" key={i}>
                                    <td className="td-edit-question">
                                        {i + 1}. {q.question}
                                    </td>
                                    <td className="td-edit-question-button">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </td>
                                    <td onClick={() => deleteQuestion(q.id)} className="td-delete-question-button">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div >
        )
    }
    return null;

}

export default EditQuiz
