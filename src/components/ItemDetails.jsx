import React from 'react'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useNavigate, useParams } from 'react-router-dom'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'
import {
  addToWatchList,
  removeFromWatchList,
  getWatchList
} from '../../services/WatchList'
import AutoBiddingInfo from './AutoBiddingInfo'
const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5045')

const ItemDetails = () => {
  const [auction, setAuction] = useState('')
  const auctionId = useParams().auctionId
  const [error, setError] = useState('')
  const [bidAmount, setBidAmount] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bidCount, setBidCount] = useState(0)
  const [showAutoBidInfo, setShowAutoBidInfo] = useState(false)
  const [showMinIncrement, setShowMinIncrement] = useState(false)
  const [minIncrement, setMinIncrement] = useState(10)
  const [auctionEnded, setAuctionEnded] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    ended: false
  })
  const navigate = useNavigate()

  const getList = async () => {
    const watchList = await getWatchList()
    watchList.some((item) => item.auctionId === auctionId)
    console.log(auctionId)
    console.log(watchList)
    watchList.forEach((item) => console.log(item.auctionId))
    // const isInWatchList = watchList.some((item) => item.auctionId === auctionId);
    // console.log(isInWatchList);
  }

  getList()

  useEffect(() => {
    const getAuction = async () => {
      const res = await Client(`${BASE_URL}/auctions/${auctionId}`)
      setBidCount(res.data.bidCount)
      setAuction(res.data)
    }
    socket.emit('joinAuction', auctionId)

    socket.on('newBid', (data) => {
      setBidCount(data.bidCount)
      setAuction((prev) => ({
        ...prev,
        auction: {
          ...prev.auction,
          currentPrice: data.currentPrice
        }
      }))
      setError('')
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

  const placeBid = async () => {
    try {
      if (showMinIncrement) {
        await Client.post(`${BASE_URL}/auctions/autobid`, {
          auctionId,
          increment_amount: minIncrement,
          max_bid_amount: bidAmount
        })
        setIsModalOpen(false)
      } else {
        const res = await Client.post(
          `${BASE_URL}/auctions/${auctionId}/bids`,
          {
            amount: bidAmount
          }
        )
      }
      setError('')
    } catch (error) {
      setError(error.response.data)
    }
  }

  useEffect(() => {
    let timer
    console.log(auction)
    const updateCountdown = () => {
      if (auction && auction.auction.endDate) {
        const end = new Date(auction.auction.endDate).getTime()
        const now = new Date().getTime()
        const diff = end - now
        if (diff <= 0) {
          setTimeLeft({ ended: true })
          setAuctionEnded(true)
          return
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((diff / (1000 * 60)) % 60)
        setTimeLeft({ days, hours, minutes, ended: false })
        setAuctionEnded(false)
      }
    }
    updateCountdown()
    timer = setInterval(updateCountdown, 1000)
    if (auction && auction.auction && auction.auction.currentPrice) {
      setBidAmount(auction.auction.currentPrice + 21)
    }
    return () => clearInterval(timer)
  }, [auction])

  const getDateFormatted = (dateString) => {
    const formatedDate = new Date(dateString)
    const year = formatedDate.getFullYear()
    const month = String(formatedDate.getMonth())
    const day = String(formatedDate.getDate())
    const hours = String(formatedDate.getHours())
    const minutes = String(formatedDate.getMinutes())
    return `${month}/${day}/${year} at ${hours}:${minutes}`
  }

  return (
    <div className="item-page">
      <div className="item-page-header">
        <div className="blurry-circle back" onClick={() => navigate(-1)}>
          <img
            src="/design-images/arrow.svg"
            alt="back"
            className="back-arrow"
          />
        </div>
        <div
          className="blurry-circle favorite"
          onClick={() =>
            isInWatchList
              ? removeFromWatchList(auctionId)
              : addToWatchList(auction)
          }
        >
          <img
            src="/design-images/book-mark.svg"
            alt="favorite"
            className="back-arrow"
          />
        </div>
      </div>
      <div className="item-page-body">
        <div className="item-images-container">
          <img src="/items/watch.webp" alt="item-image" />
        </div>
        <div className="item-details">
          <p className="">Lot ID # {auction && auction.auction.itemId._id}</p>
          <p className="">{auction && auction.auction.itemId.name}</p>
          <p className="">Current Bid</p>
          <p className="">BHD {auction && auction.auction.currentPrice}</p>
          <p className="bids-count">
            {bidCount && `${bidCount}`} Bids • Closes on:{' '}
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
        <div className="bidding-time">
          {timeLeft.ended ? (
            'Auction closed'
          ) : (
            <>
              <span className="countdown">
                <span className="countdown-num">{timeLeft.days}</span> <span className="countdown-label">Days</span>{' '}
              </span>
              :{' '}
              <span className="countdown">
                <span className="countdown-num">{timeLeft.hours}</span> <span className="countdown-label">Hours</span>{' '}
              </span>
              :{' '}
              <span className="countdown">
                <span className="countdown-num">{timeLeft.minutes}</span>{' '}
                <span className="countdown-label">Minutes</span>
              </span>
            </>
          )}
        </div>
        <button
          className="action-button"
          onClick={() => setIsModalOpen(true)}
          disabled={auctionEnded}
        >
          {auctionEnded ? 'Auction Ended' : 'Bid Now'}
        </button>
      </div>
      {isModalOpen && !auctionEnded && (
        <div
          className="modal"
          onClick={(e) => {
            if (e.target.classList.contains('modal')) {
              setIsModalOpen(false)
            }
          }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <p>Place Bid</p>
              <div className="bidding-time2">
                <img src="/design-images/stopwatch.svg" alt="" />
                {`${timeLeft.days}d:${timeLeft.hours}h:${timeLeft.minutes}m`}
              </div>
            </div>
            <div className="modal-auto-bidding">
              <div className="auto-bid-info">
                <p>Use Auto Bid </p>

                <img
                  src="/design-images/info.svg"
                  alt=""
                  className="info-icon"
                  onClick={() => setShowAutoBidInfo(true)}
                />
              </div>

              <div className="container">
                <input
                  type="checkbox"
                  className="checkbox"
                  id="checkbox"
                  onClick={() => setShowMinIncrement((prev) => !prev)}
                />
                <label className="switch" htmlFor="checkbox">
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="modal-bid-amount">
              <button
                className="minus_button"
                onClick={() =>
                  setBidAmount(
                    bidAmount > (auction?.auction?.currentPrice || 0)
                      ? bidAmount - 1
                      : bidAmount
                  )
                }
              >
                <svg
                  width="55"
                  height="54"
                  viewBox="0 0 55 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="27.5" cy="27" rx="27.5" ry="27" fill="#F2F4F5" />
                  <path
                    d="M18 27H38"
                    stroke="#303940"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <span>BHD {bidAmount}</span>
              <button
                className="plus_button"
                onClick={() => setBidAmount(bidAmount + 1)}
              >
                <svg
                  width="55"
                  height="54"
                  viewBox="0 0 55 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="27.5" cy="27" rx="27.5" ry="27" fill="#F2F4F5" />
                  <path
                    d="M18 27H38"
                    stroke="#303940"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M27.999 37.0001V17.0001"
                    stroke="#303940"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            {showMinIncrement && (
              <div className="min-increment-field" style={{ margin: '16px 0' }}>
                <label htmlFor="minIncrement">
                  You need to set a minimum increment
                </label>
                <div className="modal-bid-amount">
                  <button
                    className="minus_button"
                    onClick={() =>
                      setMinIncrement(minIncrement > 10 ? minIncrement - 1 : 10)
                    }
                  >
                    <svg
                      width="55"
                      height="54"
                      viewBox="0 0 55 54"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        cx="27.5"
                        cy="27"
                        rx="27.5"
                        ry="27"
                        fill="#F2F4F5"
                      />
                      <path
                        d="M18 27H38"
                        stroke="#303940"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <span>BHD {minIncrement}</span>
                  <button
                    className="plus_button"
                    onClick={() => setMinIncrement(minIncrement + 1)}
                  >
                    <svg
                      width="55"
                      height="54"
                      viewBox="0 0 55 54"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        cx="27.5"
                        cy="27"
                        rx="27.5"
                        ry="27"
                        fill="#F2F4F5"
                      />
                      <path
                        d="M18 27H38"
                        stroke="#303940"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M27.999 37.0001V17.0001"
                        stroke="#303940"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            <button onClick={placeBid} className="sign-button">
              Add Deposit
            </button>
            <div className="terms">
              <p>
                We ensure your information is kept secure. For more information,
                check our <span>Privacy Policy</span> and{' '}
                <span>Terms & Conditions</span>
              </p>
            </div>
            <div className="error">
              <p>{error && error}</p>
            </div>
          </div>
        </div>
      )}
      {showAutoBidInfo && (
        <AutoBiddingInfo setShowAutoBidInfo={setShowAutoBidInfo} />
      )}
    </div>
  )
}

export default ItemDetails
