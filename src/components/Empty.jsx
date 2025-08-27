import React from "react";

const Empty = ({ image, text, button }) => {
  return (
    <div className="empty-page">
      {image && <img src={image} alt="Empty" />}
      {text && <p>{text}</p>}
      {button && <button>{button}</button>}
    </div>
  );
};

export default Empty;
