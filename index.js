const express = require('express')
const path = require("path")
const cors = require('cors')
const app = express()

const api = require("./api")

const port = 3000
const webPath = path.join(__dirname, 'page')

app.use(cors())

app.use("/", express.static(webPath))

app.use("/api", api)

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}/`)
})