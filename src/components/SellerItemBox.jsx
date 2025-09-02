import React from "react";
import Client from "../../services/api";
import { BASE_URL } from "../../globals";
import { useEffect, useState } from "react";
const SellerItemBox = ({ auction }) => {
  const [endDate, setEndDate] = useState("");

  useEffect(() => {}, []);
  return (
    <div className="seller-box" key={auction._id}>
      <div className="seller-box-header">
        <img
          src={`${BASE_URL}/${auction.images[0]}`}
          alt="item-image"
          className="seller-box-item-image"
        />
        <div className="seller-box-description">
          <p className="primary-text">{auction.name}</p>
          <p className="secondary-text">{auction.category}</p>
        </div>
        <div className={"status-box"}>
          <div className={`status-box`}>
            <p className={`${auction.status}`}>{auction.status}</p>
          </div>
        </div>
      </div>
      <div className="seller-box-footer">
        <p>
          <span>&nbsp; {auction.createdAt.split("T")[0]}</span>
        </p>
        {auction.status === "approved" && (
          <input
            type="date"
            min={new Date(Date.now() + 345600000).toISOString().split("T")[0]}
            onChange={(e) => {
              Client.post("/auctions", {
                itemId: auction._id,
                endDate: new Date(e.target.value).toISOString(),
                startDate: new Date(Date.now() + 86400000).toISOString(),
                initialPrice: auction.price,
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SellerItemBox;
