import React from "react";

const WatchListBox = ({ auction }) => {
  const formatRemainingTime = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    let diff = end - now;
    if (diff <= 0) return "0d 0h";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  };
  return (
    <div className="watchlist-box">
      <div className="watchlist-box-header">
        <img src="/items/car-plate.jpg" alt="" className="watch-list-image" />
        <div className="watchlist-item-name">
          <p className="primary-text">{auction.item.name}</p>
          <p className="secondary-text">{auction.item.category}</p>
        </div>
        <div className="watchlist-action-box">
          <button>
            <img
              src="/design-images/book-mark.svg"
              alt="remove"
              className="active-bookmark"
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
