import React from 'react'
import { cher } from './cher'

const SnappedImage = ({ imageSrc, box }) => {
  function randomCher() {
    // return cher[Math.floor(Math.random() * cher.length)]
    console.log(cher)
  }
  randomCher()

  const mappedBox = box.length
    ? box.map((item, i) => {
        const style = {
          top: item.top + '%',
          right: item.right + '%',
          bottom: item.bottom + '%',
          left: item.left + '%'
          // backgroundImage: `url('${randomCher()}')`
        }

        return <div key={i} className='bounding_box' style={{style}} />
      })
    : ''

  return (
    <div className='snappedImage__wrapper'>
      <img className='snappedImage' src={imageSrc} alt='Cher-fie taken' />
      {mappedBox}
    </div>
  )
}

export default SnappedImage
