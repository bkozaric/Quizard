const express = require("express");

//const db = require("../database/connection");

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


module.exports = router;