import React from "react";
import NavBar from "../components/NavBar";
import WatchListBox from "../components/WatchListBox";
import { getWatchList } from "../../services/WatchList"
import { useEffect, useState } from "react"
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
        <div className="watch-list-grid">
          {auctions.map((watchList) => (
            <WatchListBox key={watchList.id} auction={watchList} />
          ))}
        </div>
      </main>
      <NavBar />
    </div>
  );
};

export default Watchlist;
