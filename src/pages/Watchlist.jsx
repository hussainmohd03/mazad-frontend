import React from 'react'
import NavBar from '../components/NavBar'
import WatchListBox from '../components/WatchListBox'
import { useEffect, useState, useContext } from 'react'
import { io } from 'socket.io-client'
const socket = io('https://mazad-704ecf2af46e.herokuapp.com:5045')
import UserContext from '../context/UserContext'
import EmptyPage from '../components/EmptyPage'
import Client from '../../services/api'
const Watchlist = () => {
  const { user } = useContext(UserContext)
  const [auctions, setAuctions] = useState([])
  useEffect(() => {
    socket.emit('joinUser', user.id)
  }, [])

  useEffect(() => {
    const getWatchList = async () => {
      try {
        const response = await Client.get('/watchlist/me')
        setAuctions(response.data)
      } catch (error) {
        console.error('Error fetching watchlist:', error)
        throw error
      }
    }

    getWatchList()
  }, [])

  return (
    <div className="activity-page">
      <header>
        <p className="activity-header">WatchList</p>{' '}
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
              <WatchListBox key={auction._id} auction={auction} />
            ))}
          </div>
        )}
      </main>
      <NavBar />
    </div>
  )
}

export default Watchlist
