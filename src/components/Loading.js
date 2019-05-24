import React from 'react'
import loadingCher from '../media/Cher_-_Casablanca.jpg'

const Loading = () => {
  return (
    <div className='loading_container'>
      <div className='loading_wrapper'>
        <img
          className='loading_cher_img'
          src={loadingCher}
          alt='Cher looking fabulous'
        />
        {/* <div className='shine'>~ Do you believe in life after love ~</div> */}
      </div>
    </div>
  )
}

export default Loading
