import React from 'react'
import NavBar from '../components/NavBar'
import auctions from '../objects/auctions.json'
import WatchListBox from '../components/WatchListBox'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
const socket = io('http://localhost:5045')
import UserContext from '../context/UserContext'
import { useContext } from 'react'
import Notificiation from '../components/Notification'
const Watchlist = ({ setNotification, notification }) => {
  const { user } = useContext(UserContext)

  useEffect(() => {
    console.log('entered use effect on mount')
    console.log(user)
    socket.emit('joinUser', user.id)
  }, [])
  
  return (
    <div className="activity-page">
      <header>
        {notification && (
          <Notificiation
            notification={notification}
            setNotification={setNotification}
          />
        )}
        <p className="activity-header">WatchList</p>        <div className="auctions-search-filter">
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
  )
}

export default Watchlist
