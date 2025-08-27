import React from "react";
import NavBar from "../components/NavBar";
import auctions from "../objects/auctions.json";
import WatchListBox from "../components/WatchListBox";
const Watchlist = () => {
  return (
    <div className="activity-page">
      <header>
        <p className="activity-header">WatchList</p>

        <div className="auctions-search-filter">
          <input type="text" name="search" placeholder="Search" />
          <span>
            <img src="/design-images/filter-icon.png" alt="filter-auctions" />
          </span>
        </div>
      </header>
      <main>
        <div className="watch-list-grid">
          {auctions.map((auction) => (
            <WatchListBox key={auction.id} auction={auction} />
          ))}
        </div>
      </main>
      <NavBar />
    </div>
  );
};

export default Watchlist;
