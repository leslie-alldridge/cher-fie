import React from 'react'
import cher from '../ewscripps.png'
import './Nav.css'

const Nav = () => {
  return (
    <div className='nav'>
      <div className='marquee'>
        <img src={cher} alt='cher' className='cher' />
      </div>
    </div>
  )
}

export default Nav
