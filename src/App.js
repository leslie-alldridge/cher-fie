import React, { Component } from 'react'
import Webcam from 'react-webcam'
import html2canvas from 'html2canvas'
import SnappedImage from './Components/SnappedImage'
import Buttons from './Components/Buttons'
// import RenderCanvas from './Components/RenderCanvas'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      box: [],
      webcamURL: '',
      screenshotURL: [],
      showSnap: false,
      loading: false
    }

    this.captureRef = React.createRef()
  }

  setRef = webcam => {
    this.webcam = webcam
  }

  handleCapture = () => {
    console.log('handleCapture is called')
    this.setState({ loading: true })

    const webcamURL = this.webcam.getScreenshot()
    const b64string = webcamURL.replace('data:image/jpeg;base64,', '')

    fetch('http://localhost:7777/imageurl', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        b64string: b64string
      })
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ showSnap: true, webcamURL: webcamURL })
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
        .then(blob => {
          this.setState({
            screenshotURL: [
              URL.createObjectURL(blob),
              ...this.state.screenshotURL
            ],
            showSnap: false
          })
        })
    })
  }

  renderCanvas = () => {
    return this.state.screenshotURL.map((url, i) => {
      return (
        <a href={url} download='download.png'>
          <img className='screenshot_img' src={url} alt='' />
        </a>
      )
    })
  }

  handleClose = () => {
    this.handleScreenshot()
  }

  render() {
    console.log('render')

    const videoConstraints = {
      facingMode: 'user'
    }

    return (
      <div className='App'>
        <div className='webcam_container'>
          <div className='webcam_wrapper'>
            {/* <div className='loading_container' /> */}
            <Webcam
              audio={false}
              ref={this.setRef}
              screenshotFormat='image/jpeg'
              videoConstraints={videoConstraints}
            />
            <div className={`snappedImage_container`} ref={this.captureRef}>
              <SnappedImage
                webcamURL={this.state.webcamURL}
                box={this.state.box}
                showSnap={this.state.showSnap}
                randomCher={this.state.randomCher}
              />
            </div>
            <Buttons
              showSnap={this.state.showSnap}
              handleClose={this.handleClose}
              handleCapture={this.handleCapture}
              handleScreenshot={this.handleScreenshot}
            />
          </div>
        </div>
        <div className='renderCanvas_container'>{this.renderCanvas()}</div>
      </div>
    )
  }
}

export default App
