import React from 'react'

const SnappedImage = ({ imageSrc, box }) => {
  const mappedBox = box.length
    ? box.map((item, i) => (
        <div
          key={i}
          className='bounding_box'
          style={{
            top: item.top + '%',
            right: item.right + '%',
            bottom: item.bottom + '%',
            left: item.left + '%'
          }}
        />
      ))
    : ''

    console.log(mappedBox)

  return (
    <div className='snappedImage__wrapper'>
      <img className='snappedImage' src={imageSrc} alt='Cher-fie taken' />
      {mappedBox}
    </div>
  )
}

export default SnappedImage
