import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../globals'
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
      <img src={`${BASE_URL}/${auction.itemId.images[0]}`} alt="item-image" />
      <div className="item-name">
        <p className="primary-text">{auction.itemId.name}</p>
        <p className="secondary-text">Price</p>
        <p className="primary-text">BHD {auction.initialPrice}</p>
      </div>
    </div>
  )
}

export default ItemCard
