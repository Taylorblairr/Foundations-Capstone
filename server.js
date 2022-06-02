const express = require('express')
const axios = require('axios')
const path = require('path')
const app = express()
const cors = require('cors')
const {stock} = require('./data.js')



app.use(express.json())
app.use(cors())
// app.use(axios())

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, './index.js'))
  })
  app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
  })
  app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, './index.css'))
  })

  app.get('/api/stock', (req, res) => {
    try {
        res.status(200).send(stock)
    } catch (error) {
        console.log('ERROR GETTING STOCK', error)
        res.sendStatus(400)

    }
  })

  const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})