import React, { Component } from 'react'
import Webcam from 'react-webcam'
import ImageInputForm from './Components/ImageInputForm'
import Nav from './Components/Nav'
// import Webcam from './Components/Webcam'
import './App.css'

class App extends Component {
  setRef = webcam => {
    this.webcam = webcam
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot()
  }

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: 'user'
    }

    return (
      <div className='App'>
        <Nav />
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
      </div>
    )
  }
}

export default App
