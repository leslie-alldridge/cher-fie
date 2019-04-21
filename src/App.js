import React, { Component } from 'react'
import Webcam from 'react-webcam'
import Clarifai from 'clarifai'
// import ImageInputForm from './Components/ImageInputForm'
// import Nav from './Components/Nav'
import SnappedImage from './Components/SnappedImage'
import './App.css'

const app = new Clarifai.App({ apiKey: 'd364ccf87cf5403d8c18879b2b60c24c' })

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageSrc: '',
      box: []
    }
  }

  setRef = webcam => {
    this.webcam = webcam
  }

  calculateFaceLocation = data => {
    const detectedFaces = data.outputs[0].data.regions

    return detectedFaces.map(face => {
      const detectedFace = face.region_info.bounding_box

      return {
        left: detectedFace.left_col * 100,
        top: detectedFace.top_row * 100,
        right: 100 - detectedFace.right_col * 100,
        bottom: 100 - detectedFace.bottom_row * 100
      }
    })
  }

  displayFaceBox = box => {
    this.setState({ box })
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot()

    const b54string = imageSrc.replace('data:image/jpeg;base64,', '')

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, { base64: b54string })
      .then(response => {
        this.setState({ imageSrc: imageSrc })
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log('oopsie poopsie doo, failed to Cher-ify', err))
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    }

    return (
      <div className='App'>
        {/* <Nav /> */}
        {/* <ImageInputForm /> */}
        <div className='webcam'>
          <Webcam
            audio={false}
            height={100 + '%'}
            width={100 + '%'}
            ref={this.setRef}
            screenshotFormat='image/jpeg'
            videoConstraints={videoConstraints}
          />
        </div>
        <div className='capture__btn' onClick={this.capture}>
          <span className='capture__btn-text'>Cher-ify</span>
        </div>
        <SnappedImage imageSrc={this.state.imageSrc} box={this.state.box} />
      </div>
    )
  }
}

export default App
