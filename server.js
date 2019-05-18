const express = require('express')
const bodyParser = require('body-parser') // goes hand in hand with express
const cors = require('cors')
const Clarifai = require('clarifai')
const moment = require('moment')

// const PORT = process.env.PORT

const app = express()
// app.use(bodyParser.json()) // activate 'bodyParser' middleware
app.use(bodyParser.json({ limit: '50mb' }))

app.use(cors())

const clarifai_app = new Clarifai.App({
  apiKey: 'd364ccf87cf5403d8c18879b2b60c24c'
})

app.post('/imageurl', (req, res) => {
  //   const snapTime = moment().format('YYMMDDhhmmss')
  //   const filename = `face-${snapTime}.jpg`
  //   const filepath = path.join(__dirname, '..', 'public', 'uploads', filename)

  clarifai_app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.b54string)
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
