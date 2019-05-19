import React from 'react'
import { cher } from './cher'

function randomCher() {
  return cher[Math.floor(Math.random() * cher.length)]
}

const SnappedImage = ({ showSnap, imageSrc, box }) => {
  console.log('snapped is rendered')
  console.log(cher[randomCher])
  
  if (!showSnap) {
    return null
  }

  const mappedBox = box.length
    ? box.map((item, i) => {
        const style = {
          top: item.top + '%',
          right: item.right + '%',
          bottom: item.bottom + '%',
          left: item.left + '%',
          backgroundImage: `url('${randomCher()}')`
        }

        return <div key={i} className='bounding_box' style={style} />
      })
    : ''

  return (
    <div className='snappedImage_wrapper'>
      <img className='snappedImage' src={imageSrc} alt='' />
      {mappedBox}
    </div>
  )
}

export default SnappedImage
