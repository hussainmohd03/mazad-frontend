import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import Client from "../../services/api";
import { BASE_URL } from "../../globals";
import Modal from "./Modal";
import {
  addToWatchList,
  removeFromWatchList,
} from "../../services/WatchList";
import AutoBiddingInfo from "./AutoBiddingInfo";
const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5045");

const ItemDetails = () => {
  const auctionId = useParams().auctionId;
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [auction, setAuction] = useState("");
  const [bidCount, setBidCount] = useState(0);
  const [bidAmount, setBidAmount] = useState();
  const [minIncrement, setMinIncrement] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [showAutoBidInfo, setShowAutoBidInfo] = useState(false);
  const [showMinIncrement, setShowMinIncrement] = useState(false);
  const [isInWatchList, setIsInWatchList] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    ended: false,
  });
  useEffect(() => {
    let timer;
    const updateCountdown = () => {
      if (auction && auction.auction.endDate) {
        const end = new Date(auction.auction.endDate).getTime();
        const now = new Date().getTime();
        const diff = end - now;
        if (diff <= 0) {
          setTimeLeft({ ended: true });
          setAuctionEnded(true);
          return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        setTimeLeft({ days, hours, minutes, ended: false });
        setAuctionEnded(false);
      }
    };
    updateCountdown();
    timer = setInterval(updateCountdown, 1000);
    if (auction && auction.auction.currentPrice) {
      setBidAmount(auction.auction.currentPrice + 21);
    }
    return () => clearInterval(timer);
  }, [auction]);

  useEffect(() => {
    const getAuction = async () => {
      const res = await Client(`${BASE_URL}/auctions/${auctionId}`);

      setBidCount(res.data.bidCount);
      setAuction(res.data);
    };
    socket.emit("joinAuction", auctionId);

    socket.on("newBid", (data) => {
      setBidCount(data.bidCount);
      setAuction((prev) => ({
        ...prev,
        auction: {
          ...prev.auction,
          currentPrice: data.currentPrice,
        },
      }));
      setError("");
    });

    socket.on("outBid", (data) => {
      // inform user
    });

    getAuction();
    const fetchWatchList = async () => {
      const response = await Client.get("/watchlist/me");
      setIsInWatchList(response.data.some((item) => item.auctionId === auctionId));
    };
    fetchWatchList();
    return () => {
      socket.emit("leaveAuction", auctionId);
      socket.off("newBid");
    };
  }, [auctionId]);

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
      setIsModalOpen(false);
      setError("");
    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  };

  const getDateFormatted = (dateString) => {
    const formatedDate = new Date(dateString);
    const year = formatedDate.getFullYear();
    const month = String(formatedDate.getMonth());
    const day = String(formatedDate.getDate());
    const hours = String(formatedDate.getHours());
    const minutes = String(formatedDate.getMinutes());
    return `${month}/${day}/${year} at ${hours}:${minutes}`;
  };
  if (!auction) return <p>Loading...</p>;

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
            console.log(auctionId);
            if (isInWatchList) {
              await Client.put(`/watchlist/me/remove/${auctionId.toString()}`);
              setIsInWatchList(false);
            } else {
              await Client.put(`/watchlist/me/add/${auctionId.toString()}`);
              setIsInWatchList(true);
            }
          }}
        >
          <img
            src="/design-images/book-mark.svg"
            alt="favorite"
            className={`back-arrow ${isInWatchList ? "active-bookmark" : ""}`}
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
            {bidCount} Bids Closes on:{" "}
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
            "Auction closed"
          ) : (
            <>
              <span className="countdown">
                <span className="countdown-num">{timeLeft.days}</span>{" "}
                <span className="countdown-label">Days</span>{" "}
              </span>
              :{" "}
              <span className="countdown">
                <span className="countdown-num">{timeLeft.hours}</span>{" "}
                <span className="countdown-label">Hours</span>{" "}
              </span>
              :{" "}
              <span className="countdown">
                <span className="countdown-num">{timeLeft.minutes}</span>{" "}
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
          {auctionEnded ? "Auction Ended" : "Bid Now"}
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
  );
};

export default ItemDetails;
