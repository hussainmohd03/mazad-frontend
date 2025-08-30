import React from 'react'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useNavigate, useParams } from 'react-router-dom'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'
const socket = io('http://localhost:5045')

const ItemDetails = () => {
  const [auction, setAuction] = useState('')
  const auctionId = useParams().auctionId
  useEffect(() => {
    const getAuction = async () => {
      const res = await Client(`${BASE_URL}/auctions/${auctionId}`)
      setAuction(res.data)
    }
    socket.emit('joinAuction', auctionId)

    socket.on('newBid', (data) => {
      // Update UI with new bid
    })

    socket.on('outBid', (data) => {
      // inform user
    })
    
    getAuction()
    return () => {
      socket.emit('leaveAuction', auctionId)
      socket.off('newBid')
    }
  }, [auctionId])

  const placeBid = async () => {}

  const getDateFormatted = (dateString) => {
    const formatedDate = new Date(dateString)
    const year = formatedDate.getFullYear()
    const month = String(formatedDate.getMonth())
    const day = String(formatedDate.getDate())
    const hours = String(formatedDate.getHours())
    const minutes = String(formatedDate.getMinutes())
    return `${month}/${day}/${year} at ${hours}:${minutes}`
  }
  const navigate = useNavigate()
  return (
    <div className="item-page">
      <div className="item-page-header" onClick={() => navigate(-1)}>
        <img src="/design-images/arrow.svg" alt="back" />
      </div>
      <div className="item-page-body">
        <div className="item-images-container">
          {/* <img src={`/${auction.item.images}`} alt="item-image" /> */}
          <img src="/items/watch.webp" alt="item-image" />
        </div>
        <div className="item-details">
          <p className="grey-1">
            Lot ID # {auction && auction.auction.itemId._id}
          </p>
          <p className="boldnbig">{auction && auction.auction.itemId.name}</p>
          <p className="grey-1">Current Bid</p>
          <p className="boldnbig">
            BHD {auction && auction.auction.currentPrice}
          </p>
          <p className="bids-count">
            0 Bids • Closes on:{' '}
            {getDateFormatted(auction && auction.auction.endDate)}
          </p>
          <div className="item-description">
            <p className="description-title">Description</p>
            <p className="description-text">
              {auction && auction.auction.itemId.description}
            </p>
          </div>
        </div>
      </div>
      <div className="item-page-footer">
        <div className="bidding-time">5 Days : 8 Hours : 17 Min</div>
        <button className="action-button">Bid Now</button>
      </div>
    </div>
  )
}

export default ItemDetails
