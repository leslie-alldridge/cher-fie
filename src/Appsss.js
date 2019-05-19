import React, { Component } from 'react'
import Webcam from 'react-webcam'
import html2canvas from 'html2canvas'
import SnappedImage from './Components/SnappedImage'
// import ErrorBoundary from './Components/ErrorBoundary'
import Button from './Components/Button'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageSrc: '',
      box: [],
      showSnap: false,
      screenshot: '',
      loading: false
    }

    this.captureRef = React.createRef()
  }

  setRef = webcam => {
    this.webcam = webcam
  }

  handleCapture = () => {
    console.log('handleCapture is called')
    const imageSrc = this.webcam.getScreenshot()
    const b54string = imageSrc.replace('data:image/jpeg;base64,', '')

    this.setState({ loading: true })

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

  displayFaceBox = box => {
    console.log('displayfacebox is called')
    this.setState({ box, loading: false })
  }

  calculateFaceLocation = data => {
    console.log('calculateFaceLoc is called')

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

  handleScreenshot = () => {
    console.log('handleScreenshot is called')

    html2canvas(this.captureRef.current).then(canvas => {
      let screenshot = canvas.toDataURL('image/png')

      fetch(screenshot)
        .then(res => res.blob())
        .then(blob => this.setState({ screenshot: URL.createObjectURL(blob) }))
    })
  }

  renderCanvas = () => {
    console.log('rendercanvas is called')

    return (
      <a href={this.state.screenshot} download='download.png'>
        <img className='screenshot_img' src={this.state.screenshot} alt='' />
      </a>
    )
  }

  handleClose = () => {
    this.setState({ showSnap: false })
  }

  render() {
    console.log('render')

    const videoConstraints = {
      facingMode: 'user'
    }

    return (
      <div className='App'>
        <div className='webcam_wrapper'>
          <Webcam
            audio={false}
            ref={this.setRef}
            screenshotFormat='image/jpeg'
            videoConstraints={videoConstraints}
          />
          <div className='snappedImage_container' ref={this.captureRef}>
            <SnappedImage
              imageSrc={this.state.imageSrc}
              box={this.state.box}
              showSnap={this.state.showSnap}
              loading={this.state.loading}
            />
          </div>
          <Button
            showSnap={this.state.showSnap}
            handleClose={this.handleClose}
            handleCapture={this.handleCapture}
            handleScreenshot={this.handleScreenshot}
          />
        </div>
      </div>
    )
  }
}

export default App
