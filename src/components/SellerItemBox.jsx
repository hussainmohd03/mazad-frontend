import React from "react";
import Client from "../../services/api";
import { useEffect } from "react";
const SellerItemBox = ({ auction }) => {
  useEffect(() => {}, []);
  return (
    <div className="seller-box" key={auction._id}>
      <div className="seller-box-header">
        <img
          src={`${auction.item.images}`}
          alt="item-image"
          className="seller-box-item-image"
        />
        <div className="seller-box-description">
          <p className="primary-text">{auction.item.name}</p>
          <p className="secondary-text">{auction.item.category}</p>
        </div>
        <div className={"status-box"}>
          <div className="approved status-container">{auction.status}</div>
        </div>
      </div>
      <div className="seller-box-footer">
        <p>
          <span>&nbsp; {auction.createdAt.split("T")[0]}</span>
        </p>
        {auction.status === "approved" && (
          <input
            type="date"
            min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
          />
        )}
      </div>
    </div>
  );
};

export default SellerItemBox;
