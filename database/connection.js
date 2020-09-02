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