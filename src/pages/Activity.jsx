import NavBar from '../components/NavBar'
import auctions from '../objects/auctions.json'
import { useState } from 'react'
import AuctionBox from '../components/AuctionBox'
const Activity = () => {
  const [activeButton, setActiveButton] = useState('Bids')

  return (
    <div className="activity-page">
      <header>
        <p className='activity-header'>Activity</p>
        <div className="toggle-buttons">
          <button
            className={activeButton === 'Bids' ? 'active' : ''}
            onClick={() => setActiveButton('Bids')}
          >
            Bids
          </button>
          <button
            className={activeButton === 'Purchases' ? 'active' : ''}
            onClick={() => {
              setActiveButton('Purchases')
            }}
          >
            Purchases
          </button>
        </div>
        <div className="auctions-search-filter">
          <input type="text" name="search" placeholder="Search" />
          <span>
            <img src="/design-images/filter-icon.png" alt="filter-auctions" />
          </span>
        </div>
      </header>
      <main>
        <div className="auctions-grid">
          {auctions.map((auction) => (
            <AuctionBox
              key={auction._id}
              auction={auction}
              activeButton={activeButton}
            />
          ))}
        </div>
      </main>
      <NavBar />
    </div>
  )
}

export default Activity
