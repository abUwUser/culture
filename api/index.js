const express = require('express')
const fs = require("fs/promises")
const path = require("path")

const router = express.Router()

router.use((req, res, next) => {
    next()
})

router.get("/randomAttraction", async (req, res) => {
    const attractionsFileContents = await fs.readFile(path.join(__dirname, '..', "constants", "attractions.json"), "utf-8")
    const attractions = JSON.parse(attractionsFileContents)
    res.send(attractions[Math.floor(Math.random() * attractions.length)])
})

module.exports = router