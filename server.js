const express = require('express')
const bodyParser = require('body-parser') 
const cors = require('cors')
const Clarifai = require('clarifai')

// const PORT = process.env.PORT

const app = express()
app.use(bodyParser.json({ limit: '50mb' }))

app.use(cors())

const clarifai_app = new Clarifai.App({
  apiKey: 'd364ccf87cf5403d8c18879b2b60c24c'
})

app.post('/imageurl', (req, res) => {
  clarifai_app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.b64string)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('Api not working'))
})

// app.listen(PORT || PORT, () => {
//   console.log(`app is running on ${PORT}`)
// })

app.listen(7777, () => {
  console.log('app is running')
})
