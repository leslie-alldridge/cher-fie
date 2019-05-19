import React from 'react'

const Button = ({ showSnap, handleClose, handleCapture, handleScreenshot }) => {
  if (showSnap) {
    return (
      <div>
        <div className='btn btn__close' onClick={handleClose}>
          <span className='capture__btn-text'>X</span>
        </div>
        <button type='button' onClick={handleScreenshot}>
          download
        </button>
        {/* {this.renderCanvas()} */}
      </div>
    )
  } else {
    return (
      <div className='btn btn__snap' onClick={handleCapture}>
        <span className='capture__btn-text'>Take a Cher-fie</span>
      </div>
    )
  }
}

export default Button
