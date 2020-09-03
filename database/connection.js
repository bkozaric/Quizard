const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 10,
    user: "root",
    password: "root",
    database: "quizard",
    host: "localhost",
    port: "3306"
});

let db = {};

db.fetchAnswers = (questionId) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM answers WHERE questionId=${questionId};`,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            })
    })
}

db.fetchQuestions = (quizId) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM questions WHERE quizId=${quizId};`,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            })
    })
}

db.deleteQuiz = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM quizes WHERE id=${id}`,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            })
    })
}

db.fetchQuizesQuestionCount = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT
                        q.id AS quizId,
                        q.title AS quizTitle,
                        COUNT(q2.id) AS questionCount
                    FROM quizes q
                        JOIN questions q2 on q.id = q2.quizId
                    GROUP BY q.id, q.title;`,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            })
    })
}


db.fetchQuizes = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT
                        q.id AS quizId,
                        q.title AS quizTitle,
                        q2.id AS questionId,
                        q2.question AS question
                    FROM quizes q
                        JOIN questions q2 on q.id = q2.quizId;`,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            })
    })
}


db.createQuiz = (title) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO quizes (title) VALUES ('${title}')`,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            })
    })
}

db.createQuestion = (question, quizId) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO questions (question, quizId) VALUES ('${question}', ${quizId})`,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            })
    })
}

db.createAnswer = (answer, isCorrect, questionId) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO answers (answer, isCorrect, questionId) VALUES ('${answer}', ${isCorrect}, ${questionId})`,
            (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            })
    })
}

module.exports = db;