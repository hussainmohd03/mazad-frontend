import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import Client from "../../services/api";
import { BASE_URL } from "../../globals";
import {
  addToWatchList,
  removeFromWatchList,
  getWatchList,
} from "../../services/WatchList";
import AutoBiddingInfo from "./AutoBiddingInfo";
import Modal from "./Modal";

const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5045");

const ItemDetails = () => {
  const { auctionId } = useParams()
  const navigate = useNavigate()

  const [auction, setAuction] = useState(null)
  const [bidAmount, setBidAmount] = useState(0)
  const [minIncrement, setMinIncrement] = useState(10)
  const [bidCount, setBidCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showAutoBidInfo, setShowAutoBidInfo] = useState(false)
  const [showMinIncrement, setShowMinIncrement] = useState(false)
  const [isInWatchList, setIsInWatchList] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchWatchList = async () => {
      const watchList = await getWatchList()
      setIsInWatchList(watchList.some((item) => item.auctionId === auctionId))
    }
    fetchWatchList()
  }, [auctionId])


  useEffect(() => {
    const getAuction = async () => {
      const res = await Client(`${BASE_URL}/auctions/${auctionId}`)
      setAuction(res.data.auction || res.data)
      setBidCount(res.data.bidCount || 0)
    };

    socket.emit("joinAuction", auctionId)

    socket.on("newBid", (data) => {
      setBidCount(data.bidCount)
      setAuction((prev) => ({
        ...prev,
        currentPrice: data.currentPrice,
      }))
      setError("")
    })

    socket.on("outBid", () => {

    });

    getAuction()

    return () => {
      socket.emit("leaveAuction", auctionId)
      socket.off("newBid")
      socket.off("outBid")
    }
  }, [auctionId])


  useEffect(() => {
    if (auction?.currentPrice) {
      setBidAmount(auction.currentPrice + 21)
    }
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


  const placeBid = async () => {
    try {
      if (showMinIncrement) {
        await Client.post(`${BASE_URL}/auctions/autobid`, {
          auctionId,
          increment_amount: minIncrement,
          max_bid_amount: bidAmount,
        });
      } else {
        await Client.post(`${BASE_URL}/auctions/${auctionId}/bids`, {
          amount: bidAmount,
        });
      }
      setIsModalOpen(false)
      setError("");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  if (!auction) return <p>Loading...</p>

  return (
    <div className="item-page">
      <div className="item-page-header">
        <div className="blurry-circle back" onClick={() => navigate(-1)}>
          <img src="/design-images/arrow.svg" alt="back" className="back-arrow" />
        </div>
        <div
          className="blurry-circle favorite"
          onClick={async () => {
            if (isInWatchList) {
              await removeFromWatchList(auctionId);
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
          <p>Lot ID # {auction.itemId?._id}</p>
          <p>{auction.itemId?.name}</p>
          <p>Current Bid</p>
          <p>BHD {auction.currentPrice}</p>
          <p className="bids-count">
            {bidCount} Bids Closes on: {getDateFormatted(auction.endDate)}
          </p>
          <div className="item-description">
            <p className="description-title">Description</p>
            <p className="description-text">{auction.itemId?.description}</p>
          </div>
        </div>
      </div>
      <div className="item-page-footer">
        <div className="bidding-time">5 Days : 8 Hours : 17 Min</div>
        <button className="action-button" onClick={() => setIsModalOpen(true)}>
          Bid Now
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
          setShowAutoBidInfo={setShowAutoBidInfo}
        />
      )}
      {showAutoBidInfo && <AutoBiddingInfo setShowAutoBidInfo={setShowAutoBidInfo} />}
    </div>
  )
}

export default ItemDetails
