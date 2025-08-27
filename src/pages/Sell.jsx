
import React from "react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import AuctionBox from "../components/AuctionBox";
import auctions from "../objects/auctions.json";
import ItemForm from "../components/ItemForm";
const Sell = () => {
  const [activeButton, setActiveButton] = useState("on-auction");

  return (
    <div className="sell-page">
      <header>
        <p className="activity-header">Sell</p>
        <div className="toggle-buttons">
          <button
            className={activeButton === "on-auction" ? "active" : ""}
            onClick={() => setActiveButton("on-auction")}
          >
            On Auction
          </button>
          <button
            className={activeButton === "sell-item" ? "active" : ""}
            onClick={() => {
              setActiveButton("sell-item");
            }}
          >
            Sell Item
          </button>
        </div>
      </header>
      <main>
        {activeButton === "on-auction" && (
          <div className="auctions-grid">
            {auctions.map((auction) => (
              <AuctionBox
                key={auction._id}
                auction={auction}
                activeButton={activeButton}
              />
            ))}
          </div>
        )}
        {activeButton === "sell-item" && <ItemForm />}
      </main>
      <NavBar />
    </div>
  )
}

export default Sell
