import React from "react";
import { useNavigate } from "react-router-dom";

const AuctionBox = ({ auction, activeButton }) => {
  const navigate = useNavigate();
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

  return activeButton === "Bids" ? (
    <div
      className="auction-box"
      key={auction._id}
      onClick={() => {
        navigate(`/auctions/${auction._id}`);
      }}
    >
      <div className="auction-box-header">
        <img
          src={`${auction.item.images}`}
          alt="item-image"
          className="auction-box-item-image"
        />
        <div className="auction-box-description">
          <p className="primary-text">{auction.item.name}</p>
          <p className="secondary-text">{auction.item.category}</p>
        </div>
      </div>
      <div className="auction-box-footer">
        <p>
          <span className="currency">BHD&nbsp;</span>
          {auction.currentPrice.toLocaleString()}
        </p>
        <p>
          <img src={`design-images/bids-count.svg`} alt="total-bids" />{" "}
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
        navigate(`/auctions/${auction._id}`);
      }}
    >
      <div className="auction-box-header">
        <img
          src={`${auction.item.images}`}
          alt="item-image"
          className="auction-box-item-image"
        />
        <div className="auction-box-description">
          <p className="primary-text">{auction.item.name}</p>
          <p className="secondary-text">{auction.item.category}</p>
        </div>
      </div>
      <div className="auction-box-footer">
        <p>
          <span className="currency">BHD&nbsp;</span>
          {auction.currentPrice.toLocaleString()}
        </p>
        <p>{auction.endDate.split("T")[0]}</p>
      </div>
    </div>
  );
};

export default AuctionBox;
