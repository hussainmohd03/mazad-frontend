import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AuctionBox from "../components/AuctionBox";
import { getSellerItems } from "../../services/item";
import EmptyPage from "../components/EmptyPage";
import SellerItemBox from "../components/SellerItemBox";
// import auctions from "../objects/auctions.json";

const Sell = () => {
  const [activeButton, setActiveButton] = useState("on-auction");
  const [sellerItems, setSellerItems] = useState([]);

  useEffect(() => {
    const fetchSellerItems = async () => {
      try {
        const items = await getSellerItems();
        setSellerItems(items.items);
      } catch (error) {
        console.error("Failed to fetch seller items:", error);
      }
    };
    fetchSellerItems();
  }, []);

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
            className={activeButton === "for-sale" ? "active" : ""}
            onClick={() => {
              setActiveButton("for-sale");
            }}
          >
            For Sale
          </button>
        </div>
      </header>
      <main>
        <div className="auctions-grid">
          {activeButton === "for-sale" ? (
            sellerItems.length > 0 ? (
              sellerItems.map((item) => (
                <SellerItemBox key={item._id} auction={item} />
              ))
            ) : (
              <EmptyPage image={"design-images/no-assets-listed.svg"} />
            )
          ) : sellerItems.length > 0 ? (
            sellerItems.map((auction) => (
              <AuctionBox key={auction._id} auction={auction} />
            ))
          ) : (
            <EmptyPage image={"design-images/no-assets-listed.svg"} />
          )}
        </div>
      </main>
      <NavBar />
    </div>
  );
};

export default Sell;
