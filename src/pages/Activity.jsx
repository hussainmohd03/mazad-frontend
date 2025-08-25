import React from "react";
import NavBar from "../components/NavBar";
import auctions from '../objects/auctions.json'
const Activty=()=> {

  const formatRemainingTime=(endDate)=> {
  const now = new Date()
  const end = new Date(endDate)
  let diff = end - now;

  if (diff <= 0) return "0d 0h"

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  diff -= days * (1000 * 60 * 60 * 24)

  const hours = Math.floor(diff / (1000 * 60 * 60))

  return `${days}d ${hours}h`
}

  return <div className="activity-page">
    <header>
      <p><strong>Activity</strong></p>
      <button>Bids</button><button>Purchases</button>
    </header>
    <main>
      <div className="auctions-search-filter"><input type="text" name="search" placeholder="Search" /><span><img src="/design-images/filter-icon.png" alt="filter-auctions" /></span></div>
      <div className="auctions-grid">
        {auctions.map (auction =>(
          <div className="auction-box">
            <div className="auction-box-header">
            <img src={`${auction.item.images}`} alt="item-image" className="auction-box-item-image"/> <div className="auction-box-description"><p className="primary-text">{auction.item.name}</p> <p className="secondary-text">{auction.item.category}</p></div>
            </div><div className="auction-box-footer">
              <p><strong>BHD </strong>{auction.currentPrice}</p><p><img src={`design-images/bids-count.png`} alt="total-bids" /> <span>4</span></p><p>{formatRemainingTime(auction.endDate)}<span><img src={`design-images/bids-time.png`} alt="time-left" /></span></p>
              </div>
            </div>
        ))}
        </div>
    </main>
    <NavBar/>
    </div>
}

export default Activty;
