const express = require('express')
const webscape = require('./routes/process')
const app = express()

app.use('/', webscape)

app.listen(3000, () => console.log('Example app listening on port 3000!'))