import React, { Component } from 'react'
import Webcam from 'react-webcam'
import Clarifai from 'clarifai'
// import ImageInputForm from './Components/ImageInputForm'
// import Nav from './Components/Nav'
// import Webcam from './Components/Webcam'
import SnappedImage from './Components/SnappedImage'
import './App.css'

const app = new Clarifai.App({ apiKey: 'd364ccf87cf5403d8c18879b2b60c24c' })

class App extends Component {
  setRef = webcam => {
    this.webcam = webcam
  }

  capture = () => {
    console.log('Snapped')

    const imageSrc = this.webcam
      .getScreenshot()
      .replace('data:image/png;base64,', '')

    console.log(imageSrc)

    // const photoTaken = document.querySelector('.photoTaken')

    // const imageNode = document.createElement('img')
    // imageNode.setAttribute('src', imageSrc)
    // imageNode.setAttribute('height', '768')
    // imageNode.setAttribute('width', '1024')

    // photoTaken.appendChild(imageNode)
    app.models.predict(Clarifai.FACE_DETECT_MODEL, { base64: imageSrc }).then(
      function(response) {
        console.log(
          response.outputs[0].data.regions[0].region_info.bounding_box
        )
      },
      function(err) {
        console.log('oopsie poopsie doo, failed to Cher-ify', err)
      }
    )
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
            // screenshotFormat='image/jpeg'
            videoConstraints={videoConstraints}
          />
        </div>
        <div className='capture__btn' onClick={this.capture}>
          <span className='capture__btn-text'>Cher-ify</span>
        </div>
        <div className='photoTaken' />
      </div>
    )
  }
}

export default App
