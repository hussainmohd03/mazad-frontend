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
        {item.name}
        Price <br />
        BHD {item.price}
      </div>
    </div>
  );
};

export default ItemCard;
