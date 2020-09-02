import React, { useState } from 'react'
import "./Quiz.css"

const Quiz = (props) => {

    const [startDelete, setStartDelete] = useState(false)

    const deleteQuiz = async () => {
        if (!startDelete) {
            setStartDelete(true);
        }
        else {
            setStartDelete(false);
            await fetch("/api/quizard/delete/" + props.id, { method: "DELETE" })
                .then(answer => {
                    if (answer.status === 200) {
                        window.location.reload();
                    }
                })
                .catch(err => console.log(err));
        }
    }


    return (
        <div className="quiz-container">
            <h1 className="quiz-manager-title">{props.title}</h1>
            {props.questions.map((q, index) => <p key={index} className="quiz-manager-question">{index + 1}. {q}</p>)}
            <div className="quiz-manage-buttons">
                <div className="edit-quiz">Edit</div>
                <div onClick={() => deleteQuiz()} className="delete-quiz">Delete</div>
            </div>
            {startDelete && <p className="delete-message-confirm">Are you sure you want to delete this quiz?<br />Press 'DELETE' again to confirm.</p>}

        </div>
    )
}

export default Quiz
