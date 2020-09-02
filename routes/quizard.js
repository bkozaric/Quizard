const express = require("express");

const db = require("../database/connection");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        //const results = await db.fetchReleases();
        res.status(200).json({ message: "Hello world" })
    }
    catch (err) {
        res.sendStatus(500);
    }
})

router.post("/createquiz/", async (req, res) => {
    try {
        const { name, questions } = req.body;

        const resultsQuiz = await db.createQuiz(name);
        questions.forEach(async (q) => {
            const resultsQuestion = await db.createQuestion(q.question, resultsQuiz.insertId);
            q.answers.forEach(async (a) => {
                await db.createAnswer(a, a === q.correct ? 1 : 0, resultsQuestion.insertId);
            })
        })

        res.status(200).json({ success: resultsQuiz.affectedRows });

    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})


module.exports = router;