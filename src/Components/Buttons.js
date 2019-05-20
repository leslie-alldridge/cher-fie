import React from 'react'

const Button = ({ showSnap, handleClose, handleCapture }) => {
  if (showSnap) {
    return (
      <div>
        <div className='btn btn_close' onClick={handleClose}>
          <span className='capture__btn-text'>X</span>
        </div>
      </div>
    )
  } else {
    return (
      <div className='btn btn_snap' onClick={handleCapture}>
        <span className='capture_btn-text'>Take a Cher-fie</span>
      </div>
    )
  }
}

export default Button
