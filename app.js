const express = require('express')
const casper = require('./routes/process')
const app = express()

app.use('/', casper)

app.listen(3000, () => console.log('Example app listening on port 3000!'))