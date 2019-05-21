import React, { Component } from 'react'
import Webcam from 'react-webcam'
import html2canvas from 'html2canvas'
import SnappedImage from './Components/SnappedImage'
import Buttons from './Components/Buttons'
import Loading from './Components/Loading'
import RenderCanvas from './Components/RenderCanvas'
import DisplayError from './Components/DisplayError'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      box: [],
      webcamURL: '',
      screenshotURL: [],
      showSnap: false,
      loading: false,
      hasError: false
    }

    this.captureRef = React.createRef()
  }

  setRef = webcam => {
    this.webcam = webcam
  }

  handleCapture = () => {
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
      .catch(err => {
        console.log('oopsie doo, failed to Cher-ify', err)
        this.setState({ loading: false, hasError: true, showSnap: false })
      })
  }

  displayFaceBox = box => {
    this.setState({ box, loading: false })
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

  handleScreenshot = () => {
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

  handleClose = () => {
    this.handleScreenshot()
  }

  handleBackTo = () => {
    this.setState({ hasError: false, box: [] })
  }

  render() {
    const {
      webcamURL,
      box,
      showSnap,
      screenshotURL,
      loading,
      hasError
    } = this.state
    const {
      setRef,
      captureRef,
      handleClose,
      handleCapture,
      handleScreenshot
    } = this

    const videoConstraints = {
      facingMode: 'user'
    }

    return (
      <div className='App'>
        <div className='webcam_container'>
          <div className='webcam_wrapper'>
            {loading && <Loading />}
            {hasError && <DisplayError handleBackTo={this.handleBackTo} />}
            <Webcam
              audio={false}
              ref={setRef}
              screenshotFormat='image/jpeg'
              videoConstraints={videoConstraints}
            />
            <div className={`snappedImage_container`} ref={captureRef}>
              <SnappedImage
                webcamURL={webcamURL}
                box={box}
                showSnap={showSnap}
              />
            </div>
            <Buttons
              showSnap={showSnap}
              handleClose={handleClose}
              handleCapture={handleCapture}
              handleScreenshot={handleScreenshot}
            />
          </div>
        </div>
        <RenderCanvas screenshotURL={screenshotURL} />
      </div>
    )
  }
}

export default App
