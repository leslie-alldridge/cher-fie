import React, { Component } from 'react'
import Webcam from 'react-webcam'
import Clarifai from 'clarifai'
// import Nav from './Components/Nav'
import SnappedImage from './Components/SnappedImage'
// import Button from './Components/Button'
import './App.css'

const app = new Clarifai.App({ apiKey: 'd364ccf87cf5403d8c18879b2b60c24c' })

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageSrc: '',
      box: [],
      showSnap: false
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

  handleCapture = () => {
    const imageSrc = this.webcam.getScreenshot()
    const b54string = imageSrc.replace('data:image/jpeg;base64,', '')

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, { base64: b54string })
      .then(response => {
        this.setState({ showSnap: true, imageSrc: imageSrc })
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log('oopsie doo, failed to Cher-ify', err))
  }

  handleClose = () => {
    this.setState({ showSnap: false })
  }

  render() {
    const videoConstraints = {
      facingMode: 'user'
    }

    return (
      <div className='App'>
        <div className='container'>
          <div className='webcam_wrapper'>
            <Webcam
              audio={false}
              ref={this.setRef}
              screenshotFormat='image/jpeg'
              videoConstraints={videoConstraints}
            />
            {this.state.showSnap ? (
              <div className='snappedImage_container'>
                <SnappedImage
                  imageSrc={this.state.imageSrc}
                  box={this.state.box}
                  alt={'Oh Snap!'}
                  handleClose={this.handleClose}
                />
              </div>
            ) : null}

            {this.state.showSnap ? (
              <div className='btn btn__close' onClick={this.handleClose}>
                <span className='capture__btn-text'>X</span>
              </div>
            ) : (
              <div className='btn btn__snap' onClick={this.handleCapture}>
                <span className='capture__btn-text'>Take a Cher-fie</span>
              </div>
            )}
            {/* <Button
            handleCapture={this.handleCapture}
            handleClose={this.handleClose}
            showSnap={this.state.showSnap}
          /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default App
