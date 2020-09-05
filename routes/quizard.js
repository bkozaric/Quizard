const express = require("express");

const db = require("../database/connection");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const results = await db.fetchQuizes();
        res.status(200).json(results)
    }
    catch (err) {
        res.sendStatus(500);
    }
})

router.get("/iscorrect/:aid", async (req, res) => {
    try {
        const results = await db.checkIfAnswerCorrect(req.params.aid);
        res.status(200).json(results)
    }
    catch (err) {
        res.sendStatus(500);
    }
})


router.get("/correctanswers/:qid", async (req, res) => {
    try {
        const results = await db.fetchCorrectAnswers(req.params.qid);
        res.status(200).json(results)
    }
    catch (err) {
        res.sendStatus(500);
    }
})

router.get("/answers/:qid", async (req, res) => {
    try {
        const results = await db.fetchAnswers(req.params.qid);
        res.status(200).json(results)
    }
    catch (err) {
        res.sendStatus(500);
    }
})

router.get("/questions/:qid", async (req, res) => {
    try {
        const results = await db.fetchQuestions(req.params.qid);
        res.status(200).json(results)
    }
    catch (err) {
        res.sendStatus(500);
    }
})

router.get("/quiz/:qid", async (req, res) => {
    try {
        const results = await db.fetchQuizName(req.params.qid);
        res.status(200).json(results)
    }
    catch (err) {
        res.sendStatus(500);
    }
})

router.get("/quizes", async (req, res) => {
    try {
        const results = await db.fetchQuizesQuestionCount();
        res.status(200).json(results)
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

router.delete("/delete/:id", async (req, res) => {
    try {
        const results = await db.deleteQuiz(req.params.id);
        res.status(200).json({ success: results.affectedRows && 1 });
    }
    catch (err) {
        res.sendStatus(500);
    }
})

router.delete("/question/:id", async (req, res) => {
    try {
        const results = await db.deleteQuestion(req.params.id);
        res.status(200).json({ success: results.affectedRows && 1 });
    }
    catch (err) {
        res.sendStatus(500);
    }
})


module.exports = router;