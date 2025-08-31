import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AuctionBox from "../components/AuctionBox";
import ItemForm from "../components/ItemForm";
import { getSellerItems } from "../../services/item";
import EmptyPage from "../components/EmptyPage";
const Sell = () => {
  const [activeButton, setActiveButton] = useState("on-auction");
  const [sellerItems, setSellerItems] = useState([]);

  useEffect(() => {
    const fetchSellerItems = async () => {
      const items = await getSellerItems();
      setSellerItems(items.items);
    };

    fetchSellerItems();
  }, []);

  return (
    <div className="sell-page">

      { activeButton === "on-auction" && (
        <>
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
            {sellerItems.length === 0 ? (
              <EmptyPage image={"design-images/no-assets-listed.svg"} />
            ) : (
              <div className="auctions-grid">
                {/* {sellerItems.map((auction) => (
                  <AuctionBox
                    key={auction._id}
                    auction={auction}
                    activeButton={activeButton}
                  />
                ))} */}
              </div>
            )}
          </main>
          <NavBar />
        </>
      )} 
      {activeButton === "sell-item" && (
        <ItemForm setActiveButton={setActiveButton} />
      )}
    </div>
  )
}

export default Sell
