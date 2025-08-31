import React from "react";
import NavBar from "../components/NavBar";
import WatchListBox from "../components/WatchListBox";
import { getWatchList } from "../../services/WatchList"
import { useEffect, useState } from "react"
import EmptyPage from "../components/EmptyPage";
const Watchlist = () => {
  const [auctions, setAuctions] = useState([])

  useEffect(() => {
    const fetchWatchList = async () => {
      const watchList = await getWatchList()
      setAuctions(watchList)
    }
    fetchWatchList()
  }, [])

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
        {auctions.length === 0 ? (
          <EmptyPage image="/design-images/no-assets-listed.svg" />
        ) : (
          <div className="watch-list-grid">
            {auctions.map((auction) => (
              <WatchListBox key={auction.id} auction={auction} />
            ))}
          </div>
        )}
      </main>
      <NavBar />
    </div>
  );
};

export default Watchlist;
