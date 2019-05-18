import React, { Component } from 'react'
import Webcam from 'react-webcam'
// import Nav from './Components/Nav'
import SnappedImage from './Components/SnappedImage'
// import ErrorBoundary from './Components/ErrorBoundary'
// import Button from './Components/Button'
import './App.css'
import html2canvas from 'html2canvas'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageSrc: '',
      box: [],
      showSnap: false,
      imgData: ''
    }
  }

  setRef = webcam => {
    this.webcam = webcam
  }

  handleCapture = () => {
    const imageSrc = this.webcam.getScreenshot()
    const b54string = imageSrc.replace('data:image/jpeg;base64,', '')

    fetch('http://localhost:7777/imageurl', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        b54string: b54string
      })
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ showSnap: true, imageSrc: imageSrc })
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log('oopsie doo, failed to Cher-ify', err))
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

  handleDownload = () => {
    this.takeScreenshot()
  }

  takeScreenshot = () => {
    let snappedImg = document.querySelector('.snappedImage_wrapper')

    html2canvas(snappedImg, { useCORS: true }).then(canvas => {
      let imgData = canvas.toDataURL('image/png')
      this.setState({ imgData })

      // return <img src={this.state.imgData} alt='screenshot' />
    })
  }

  renderCanvas = () => {
    return <img src={this.state.imgData} alt='screenshot' />
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
                  // handleClose={this.handleClose}
                />
                <div className='btn btn__close' onClick={this.handleClose}>
                  <span className='capture__btn-text'>X</span>
                </div>
              </div>
            ) : (
              <div className='btn btn__snap' onClick={this.handleCapture}>
                <span className='capture__btn-text'>Take a Cher-fie</span>
              </div>
            )}
            <a onClick={this.handleDownload}>download</a>
            {/* {this.state.imgData && (
              <a href={this.state.imgData} download='myImage.png' alt=''>
                download
              </a>
            )} */}
            {this.renderCanvas()}
          </div>
        </div>
      </div>
    )
  }
}

export default App
