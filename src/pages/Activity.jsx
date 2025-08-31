import NavBar from '../components/NavBar'
import auctions from '../objects/auctions.json'
import { useState, useEffect, useContext } from 'react'
import AuctionBox from '../components/AuctionBox'
import Notificiation from '../components/Notification'
import UserContext from '../context/UserContext'
import { io } from 'socket.io-client'
const socket = io('http://localhost:5045')

const Activity = ({ notification, setNotification }) => {
  const [activeButton, setActiveButton] = useState('Bids')
  const { user } = useContext(UserContext)

  return (
    <div className="activity-page">
      {notification && (
        <Notificiation
          notification={notification}
          setNotification={setNotification}
        />
      )}
      <header>
        <p className="activity-header">Activity</p>
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
