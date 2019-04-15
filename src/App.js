import React, { Component } from 'react'
import ImageInputForm from './Components/ImageInputForm'
import Nav from './Components/Nav'
import Webcam from './Components/Webcam'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Nav />
        <ImageInputForm />
        <Webcam />
      </div>
    )
  }
}

export default App
