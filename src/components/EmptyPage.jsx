import React from 'react'

const EmptyPage=({image})=> {
  return (
    <div className='empty-page'>
        <img src={image} alt="No items found" />
    </div>
  )
}

export default EmptyPage