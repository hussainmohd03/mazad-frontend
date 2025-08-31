Maryam
neutronsmom
Sharing their screen

Maryam — 20/08/2025, 11:17 PM
cant hear u
ZyrenLeo — 25/08/2025, 1:22 PM
Read input
o    auctionId from params.
o    amount from body.
o    userId from res.locals.payload.id.
Validate amount
o    amount present, amount > 0.
Fetch auction
o    Get auction by id. If not found → 404.
Validate auction state (400)
o    status === ongoing.
o    startDate <= now < endDate.
Validate bid amount
o    amount > auction.currentPrice.
Persist (concurrency-safe)
    Create new Bid({ auctionId, userId, amount }).
    Update auction: currentPrice = amount.
Respond
o    201 with created bid.
Realtime
o    emit(io, room="auction:{id}", 'new_bid', { auctionId, userId, amount, timestamp }).
Edge cases
•    Reject bids from auction.ownerId 
Maryam — 25/08/2025, 4:28 PM
const createItem = async (req, res) => {
  try {
    const { id } = res.locals.payload
    const user = await User.findById(id)
    if (user.verified) {
      const item = await Item.create(req.body)
      res.status(200).send({ msg: 'item created successfully', item: item })
    } else {
      return res.status(200).send('user not verified')
    }
  } catch (error) {
    throw error
  }
}
ZyrenLeo — 26/08/2025, 9:28 AM
•    Optional min increment: require amount >= currentPrice + step.
•    Prevent  ties: strictly >, first valid write wins.
Maryam — 26/08/2025, 8:23 PM
import React from 'react'
import NavBar from '../components/NavBar'
import UserContext from '../context/UserContext'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Profile = () => {
  const { user } = useContext(UserContext)
  const [name, setName] = useState('')
  useEffect(() => {
    setName(user.user.first_name)
    console.log(user)
  }, [])

  return (
    <div>
      Profile
      <br />
      <img src="/design-images/default_icon.svg" alt="" />
      {name}
      <Link>Edit profile</Link>
      <NavBar />
    </div>
  )
}

export default Profile
Maryam — 27/08/2025, 10:24 PM
https://github.com/maryamalihasanebrahim/mablagh/invitations
Maryam — 28/08/2025, 10:10 PM
MONGO_URI=mongodb+srv://maryamaliredha:iKoNJP9UFsPtdko3@maryam-cluster.ijdktda.mongodb.net/mazad
APP_SECRET=meowMeow
SALT_ROUNDS=12
Maryam — 28/08/2025, 10:44 PM

const User = require('../models/User')
const Item = require('../models/Item')
const middleware = require('../middleware/index')
const { hashPassword, comparePassword, createToken } = require('../middleware')
const Bidding = require('../models/Bidding')
Expand
message.txt
5 KB
Maryam — 29/08/2025, 9:45 PM
https://github.com/maryamalihasanebrahim/blog/tree/main/sending%20emails%20via%20SocketIO
GitHub
blog/sending emails via SocketIO at main · maryamalihasanebrahim/blog
Contribute to maryamalihasanebrahim/blog development by creating an account on GitHub.
Contribute to maryamalihasanebrahim/blog development by creating an account on GitHub.
https://github.com/novuhq/blog
GitHub
GitHub - novuhq/blog
Contribute to novuhq/blog development by creating an account on GitHub.
Contribute to novuhq/blog development by creating an account on GitHub.
Maryam — 30/08/2025, 2:43 PM
how dare
ZyrenLeo — 30/08/2025, 3:54 PM
??
Maryam — 30/08/2025, 3:54 PM
i thought it was manaf
lmao
nothing lmao
Maryam — 30/08/2025, 4:42 PM
i hate this
no i hate sockets
i have no idea what you're talking about btw im on deafen
ZyrenLeo — 30/08/2025, 4:44 PM
what is the problem
Maryam — 30/08/2025, 4:44 PM
idk
ZyrenLeo — 30/08/2025, 4:44 PM
do you want to go to the other channel
Maryam — 30/08/2025, 4:45 PM
ill mess around a lil more and then ill see 
ZyrenLeo — 30/08/2025, 4:45 PM
ok, let me know if you need anything
Maryam — 30/08/2025, 4:46 PM
ill see
Maryam — 30/08/2025, 5:41 PM
question
ZyrenLeo — 30/08/2025, 5:47 PM
yes
Maryam — 30/08/2025, 5:48 PM
i need to share my screen
Maryam — Yesterday at 7:52 PM
thus far 
these are the notifications that have been added 

change pass notifications ✅
update profile notifications ✅
item removed from watchlist (already sold)✅
outbid ✅
auto-bidding notifications ✅
i’ll add the sockets for autobidding once i’m home
ZyrenLeo — Yesterday at 7:59 PM
nice, great job
What about the socket problem, is that sorted now?
Maryam — Yesterday at 7:59 PM
i didn’t test it out but i’m suspicious of something
ZyrenLeo — Yesterday at 7:59 PM
what is it
Maryam — Yesterday at 8:00 PM
i’ll check it out at home
goal is to finish all things socket related tonight, so i can check out the google thing
ZyrenLeo — Yesterday at 8:04 PM
ohh so you’re doing the Google thing after all
Maryam — Yesterday at 8:05 PM
i’m considering it
seems like it could work
wdyt
ZyrenLeo — Yesterday at 8:05 PM
yea I don’t think its that hard to implement
Let me know when you start bc i would like to work on it too 
Maryam — Yesterday at 8:07 PM
i will
what’s ur goal for the day
ZyrenLeo — Yesterday at 8:08 PM
finishing the list of tasks I planned for today
Maryam — Yesterday at 8:08 PM
good luck
ZyrenLeo — Yesterday at 8:10 PM
you too
ZyrenLeo — 2:00 AM
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useNavigate, useParams } from 'react-router-dom'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'
import Modal from './Modal'
Expand
message.txt
8 KB
﻿
ZyrenLeo
zyrenleo
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useNavigate, useParams } from 'react-router-dom'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'
import Modal from './Modal'
import {
  addToWatchList,
  removeFromWatchList,
  getWatchList
} from '../../services/WatchList'
import AutoBiddingInfo from './AutoBiddingInfo'
const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5045')

const ItemDetails = () => {
  const auctionId = useParams().auctionId
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [auction, setAuction] = useState('')
  const [bidCount, setBidCount] = useState(0)
  const [bidAmount, setBidAmount] = useState()
  const [minIncrement, setMinIncrement] = useState(10)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [auctionEnded, setAuctionEnded] = useState(false)
  const [showAutoBidInfo, setShowAutoBidInfo] = useState(false)
  const [showMinIncrement, setShowMinIncrement] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    ended: false
  })
  useEffect(() => {
    let timer
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
    if (auction && auction.auction.currentPrice) {
      setBidAmount(auction.auction.currentPrice + 21)
    }
    return () => clearInterval(timer)
  }, [auction])

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
    const fetchWatchList = async () => {
      const watchList = await getWatchList()
      setIsInWatchList(watchList.some((item) => item.auctionId === auctionId))
    }
    fetchWatchList()
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
      } else {
        await Client.post(`${BASE_URL}/auctions/${auctionId}/bids`, {
          amount: bidAmount
        })
      }
      setIsModalOpen(false)
      setError('')
    } catch (err) {
      setError(err.response?.data || 'Something went wrong')
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
  if (!auction) return <p>Loading...</p>

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
          onClick={async () => {
            if (isInWatchList) {
              await removeFromWatchList(auctionId)
              setIsInWatchList(false)
            } else {
              await addToWatchList(auction)
              setIsInWatchList(true)
            }
          }}
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
          <p>Lot ID # {auction.auction.itemId?._id}</p>
          <p>{auction.auction.itemId?.name}</p>
          <p>Current Bid</p>
          <p>BHD {auction.auction.currentPrice}</p>
          <p className="bids-count">
            {bidCount} Bids Closes on:{' '}
            {getDateFormatted(auction.auction.endDate)}
          </p>
          <div className="item-description">
            <p className="description-title">Description</p>
            <p className="description-text">{auction.itemId?.description}</p>
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
                <span className="countdown-num">{timeLeft.days}</span>{' '}
                <span className="countdown-label">Days</span>{' '}
              </span>
              :{' '}
              <span className="countdown">
                <span className="countdown-num">{timeLeft.hours}</span>{' '}
                <span className="countdown-label">Hours</span>{' '}
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
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          auction={auction}
          bidAmount={bidAmount}
          setBidAmount={setBidAmount}
          minIncrement={minIncrement}
          setMinIncrement={setMinIncrement}
          showMinIncrement={showMinIncrement}
          setShowMinIncrement={setShowMinIncrement}
          error={error}
          placeBid={placeBid}
          timeLeft={timeLeft}
          setShowAutoBidInfo={setShowAutoBidInfo}
        />
      )}
      {showAutoBidInfo && (
        <AutoBiddingInfo setShowAutoBidInfo={setShowAutoBidInfo} />
      )}
    </div>
  )
}

export default ItemDetails