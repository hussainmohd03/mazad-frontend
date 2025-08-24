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
          <h4>{item.name}</h4>
          <h4>Current Bid {item.price}</h4>
          <p>0 Bids . Closes on: August/26 at 06:00 PM</p>
          <div className="item-description">{item.description}</div>
        </div>
      </div>
      <button className="sign-button">Bid Now</button>
    </div>
  );
};

export default ItemDetails;
