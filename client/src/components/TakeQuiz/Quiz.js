import React from 'react'
import "./Quiz.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

const Quiz = (props) => {
    return (
        <div className="quiz-pick-container">
            <h2 className="quiz-pick-title">{props.title}</h2>
            <p className="quiz-pick-question-count">Question count: {props.qcount}</p>
            <div className="quiz-pick-button"><FontAwesomeIcon icon={faAngleDoubleRight} /></div>
        </div>
    )
}

export default Quiz