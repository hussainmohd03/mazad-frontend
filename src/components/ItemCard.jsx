import React from "react";

const ItemCard = ({ item, showSelectedItem }) => {
  return (
    <div
      className="item-card"
      key={item._id}
      onClick={() => showSelectedItem(item)}
    >
      <img src={`${item.images}`} alt="item-image" />
      <div className="item-name">
        <p>{item.name}</p>
        <p>BHD {item.price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
