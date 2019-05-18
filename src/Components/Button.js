import React from 'react'

const Button = (handleClose, handleCapture, showSnap) => {
  return (
    <div className='button_container'>
      {/* <div className='btn btn__snap' onClick={handleCapture}>
        <span className='capture__btn-text'>Take a Cher-fie</span>
      </div> */}
      {showSnap ? (
        <div className='btn btn__close' onClick={handleClose}>
          <span className='capture__btn-text'>X</span>
        </div>
      ) : (
        <div className='btn btn__snap' onClick={handleCapture}>
          <span className='capture__btn-text'>Take a Cher-fie</span>
        </div>
      )}
    </div>
  )
}

export default Button
