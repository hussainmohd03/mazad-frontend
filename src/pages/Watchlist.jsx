import React from 'react'
import NavBar from '../components/NavBar'
import auctions from '../objects/auctions.json'
import WatchListBox from '../components/WatchListBox'
import { useEffect } from 'react'
import { io } from 'socket.io-client'
const socket = io('http://localhost:5045')
import UserContext from '../context/UserContext'
import { useContext } from 'react'

const Watchlist = () => {
  const { user } = useContext(UserContext)

  useEffect(() => {
    console.log('entered use effect on mount')
    socket.emit('joinUser', user.id)
    console.log(`${user.id} joined`)
    socket.on('removedItem', (notif) => {
      console.log('from frontend', notif)
      setNotification(notif)
    })
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
