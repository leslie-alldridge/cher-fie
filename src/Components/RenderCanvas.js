import React from 'react'

const RenderCanvas = ({ screenshotURL }) => {
  
  function renderScreenshot() {
    return screenshotURL.map((url, i) => {
      return (
        <a href={url} download='download.png' key={i}>
          <img className='screenshot_img' src={url} alt='' />
        </a>
      )
    })
  }

  return <div className='renderCanvas_container'>{renderScreenshot()}</div>
}

export default RenderCanvas
