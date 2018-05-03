const path = require('path')
const express = require('express')

const { env } = require('../config/config')
const app = express()
app.use('/', express.static(path.join(__dirname, '../public')))

// app.get('/', (req, res) => {
  
// })

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT} in ${env} mode...`))