import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../globals'

const AuctionBox = ({ auction, activeButton }) => {
  console.log(`${BASE_URL}/${auction.itemId.images[0]}`)
  const navigate = useNavigate()
  const formatRemainingTime = (endDate) => {
    const now = new Date()
    const end = new Date(endDate)
    let diff = end - now
    if (diff <= 0) return '0d 0h'
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    diff -= days * (1000 * 60 * 60 * 24)
    const hours = Math.floor(diff / (1000 * 60 * 60))
    return `${days}d ${hours}h`
  }

  return activeButton === 'Bids' || activeButton === 'on-auction' ? (
    <div
      className="auction-box"
      key={auction._id}
      onClick={() => {
        navigate(`/auctions/${auction._id}`)
      }}
    >
      <div className="auction-box-header">
        <img
          src={`${auction.images[0]}`}
          alt="item-image"
          className="auction-box-item-image"
        />
        <div className="auction-box-description">
          <p className="primary-text">{auction.name}</p>
          <p className="secondary-text">{auction.category}</p>
        </div>
      </div>
      <div className="auction-box-footer">
        <p>
          <span className="currency">BHD&nbsp;</span>
          {auction.currentPrice.toLocaleString()}
        </p>
        <p>
          <img src={`design-images/bids-count.svg`} alt="total-bids" />{' '}
          <span>&nbsp;4</span>
        </p>
        <p>
          <img src={`design-images/bids-time.svg`} alt="time-left" />
          <span>&nbsp; {formatRemainingTime(auction.endDate)}</span>
        </p>
      </div>
    </div>
  ) : (
    <div
      className="auction-box"
      key={auction._id}
      onClick={() => {
        navigate(`/auctions/${auction._id}`)
      }}
    >
      <div className="auction-box-header">
        <img
          src={`${BASE_URL}/${auction.itemId.images[0]}`}
          alt="item-image"
          className="auction-box-item-image"
        />
        <div className="auction-box-description">
          <p className="primary-text">{auction.name}</p>
          <p className="secondary-text">{auction.category}</p>
        </div>
      </div>
      <div className="auction-box-footer">
        <p>
          <span className="currency">BHD&nbsp;</span>
          {auction.currentPrice}
        </p>
        {/* <p>{auction.endDate.split("T")[0]}</p> */}
      </div>
    </div>
  )
}

export default AuctionBox
