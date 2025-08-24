import React from "react";

const ItemDetails = ({ item, setSelectedItem }) => {
  return (
    <div className="item-page">
      <div className="item-page-header" onClick={() => setSelectedItem(null)}>
        <img src="design-images/back-arrow.png" alt="back" />
      </div>
      <div className="item-page-body">
        <div className="item-images-container">
          <img src={`${item.images}`} alt="item-image" />
        </div>
        <div className="item-details">
          <p>Lot ID #{item._id}</p>
          <strong>{item.name}</strong>
          <p>Current Bid: {item.price}</p>
          <p>0 Bids . Closes on: August/26 at 06:00 PM</p>
          <div className="item-description">
            <strong>Description</strong> <br />
            {item.description}
          </div>
        </div>
      </div>
      <div className="item-page-footer">
        <div className="bidding-time">5 Days : 8 Hours 17 Min</div>
        <button className="action-button">Bid Now</button>
      </div>
    </div>
  );
};

export default ItemDetails;
