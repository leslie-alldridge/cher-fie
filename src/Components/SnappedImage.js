import React from 'react'
import { cher } from './cher'

function randomCher() {
  return cher[Math.floor(Math.random() * cher.length)]
}

const SnappedImage = ({ imageSrc, box, alt }) => {
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
    <div className='snappedImage__wrapper'>
      <img className='snappedImage' src={imageSrc} alt={alt} />
      {mappedBox}
    </div>
  )
}

export default SnappedImage
