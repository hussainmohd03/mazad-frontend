import React from 'react'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useNavigate, useParams } from 'react-router-dom'

const socket = io('http://localhost:5045')


const ItemDetails = () => {
  const auctionId = useParams().auctionId
  useEffect(() => {
    socket.emit('joinAuction', auctionId)

    socket.on('newBid', (data) => {
      // Update UI with new bid
    })

    socket.on('auctionStatusChanged', (data) => {
      // Update UI with new status
    })

    return () => {
      socket.emit('leaveAuction', auctionId)
      socket.off('newBid')
      socket.off('auctionStatusChanged')
    }
  }, [auctionId])

  const auction = {
    _id: '64f3a2c3d4e5f67890123441',
    ownerId: '64f1b2c3d4e5f67890123411',
    startDate: '2025-08-25T10:00:00.000Z',
    endDate: '2025-08-27T10:00:00.000Z',
    status: 'upcoming',
    initialPrice: 2500,
    currentPrice: 2500,
    winningBid: null,
    createdAt: '2025-08-25T09:00:00.000Z',
    updatedAt: '2025-08-25T09:00:00.000Z',
    item: {
      _id: '64f1a2c3d4e5f67890123401',
      name: 'Luxury Watch',
      price: 2500,
      category: 'watches',
      images: ['items/watch.webp'],
      approved: true,
      ownerId: '64f1b2c3d4e5f67890123411',
      createdAt: '2025-08-18T10:30:00.000Z',
      updatedAt: '2025-08-20T15:00:00.000Z',
      description:
        'Elegant luxury wristwatch with premium craftsmanship, perfect for formal and casual wear.'
    }
  }

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
          <img src={`/${auction.item.images}`} alt="item-image" />
        </div>
        <div className="item-details">
          <p className="grey-1">Lot ID # {auction.item._id}</p>
          <p className="boldnbig">{auction.item.name}</p>
          <p className="grey-1">Current Bid</p>
          <p className="boldnbig">BHD {auction.item.price}</p>
          <p className="bids-count">
            0 Bids • Closes on: {getDateFormatted(auction.endDate)}
          </p>
          <div className="item-description">
            <p className="description-title">Description</p>
            <p className="description-text"> {auction.item.description}</p>
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
