import React from "react";
import { useNavigate } from "react-router-dom";
const ItemCard = ({ auction }) => {
  const navigate = useNavigate()
  return (
    <div
      className="item-card"
      key={auction.item._id}
      onClick={()=>{navigate(`/auctions/${auction._id}`)}}
    > 
      <img src={`${auction.item.images}`} alt="item-image" />
      <div className="item-name">
        <p className="primary-text">{auction.item.name}</p>
        <p className="secondary-text">Price</p>
        <p className="primary-text">BHD {auction.item.price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
