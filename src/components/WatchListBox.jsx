import React from "react";
import { useEffect, useState } from "react"
import { addToWatchList,removeFromWatchList,} from "../../services/WatchList"
import Client from "../../services/api"
import { BASE_URL } from "../../globals"
const WatchListBox = ({ auction }) => {
  const formatRemainingTime = (endDate) => {
    const now = new Date()
    const end = new Date(endDate)
    let diff = end - now;
    if (diff <= 0) return "0d 0h"
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60))
    return `${days}d ${hours}h`
  }

  const [isInWatchList, setIsInWatchList] = useState(false)

  useEffect(() => {
    const fetchWatchList = async () => {
      const response = await Client.get("/watchlist/me");
      setIsInWatchList(response.data.some((item) => item.auctionId === auction._id))
    }
    fetchWatchList()
  }, [])

  return (
    <div className="watchlist-box">
      <div className="watchlist-box-header">
        <img src="/items/car-plate.jpg" alt="" className="watch-list-image" />
        <div className="watchlist-item-name">
          <p className="primary-text">{auction.item.name}</p>
          <p className="secondary-text">{auction.item.category}</p>
        </div>
        <div className="watchlist-action-box">
          <button   onClick={async () => {
                      if (isInWatchList) {
                        await removeFromWatchList(auction._id);
                        setIsInWatchList(false)
                      } else {
                        await addToWatchList(auction._id)
                        setIsInWatchList(true)
                      }
                    }}>
            <img
              src={`${BASE_URL}/design-images/book-mark.svg`}
              alt="remove"
              className={isInWatchList ? "active-bookmark" : ""}
            />
          </button>
          <button>
            <img src="/design-images/bids-count.svg" alt="bids" />
          </button>
        </div>
      </div>
      <div className="watchlist-box-footer">
        <p>
          <span className="currency">BHD&nbsp;</span>
          {auction.currentPrice.toLocaleString()}
        </p>
        <p>
          <img src={`design-images/bids-count.svg`} alt="total-bids" />{" "}
          <span>&nbsp;{auction.totalBids}</span>
        </p>
        <p>
          <img src={`design-images/bids-time.svg`} alt="time-left" />
          <span>&nbsp;{formatRemainingTime(auction.endDate)}</span>
        </p>
      </div>
    </div>
  );
};

export default WatchListBox;
