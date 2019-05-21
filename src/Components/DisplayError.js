import React from 'react'

const DisplayError = ({ handleBackTo }) => {
  return (
    <div className='loading_container'>
      <div className='loading_wrapper'>
        <div className='error_text'>Failed to Cher-ify &#9785; Try again?</div>
        <div className='btn btn_close' onClick={handleBackTo}>
          <span className='capture__btn-text'>X</span>
        </div>
      </div>
    </div>
  )
}

export default DisplayError
