import React from 'react'
import { useNavigate } from 'react-router-dom'
const ItemCard = ({ auction }) => {
  const navigate = useNavigate()
  return (
    <div
      className="item-card"
      key={auction.itemId._id}
      onClick={() => {
        navigate(`/auctions/${auction._id}`)
      }}
    >
      {/* <img src={`${auction.itemId.images}`} alt="item-image" /> */}
      {/* TODO 1: change the hard coded image */}
      <img src="items/watch.webp" alt="item-image" />
      <div className="item-name">
        <p className="primary-text">{auction.itemId.name}</p>
        <p className="secondary-text">Price</p>
        <p className="primary-text">BHD {auction.itemId.price}</p>
      </div>
    </div>
  )
}

export default ItemCard
