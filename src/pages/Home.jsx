import { NavLink } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import CategoryCard from '../components/CategoryCard'
import NavBar from '../components/NavBar'
import { useEffect, useState } from 'react'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'
import categories from '../objects/categories.json'
import { io } from 'socket.io-client'
const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5045')

const Home = () => {
  const [auctions, setAuctions] = useState([])
  useEffect(() => {
    const getAuctions = async () => {
      const res = await Client.get(`${BASE_URL}/auctions?status=ongoing`)
      setAuctions(res.data)

    }
    getAuctions()

    socket.on('updateAuctions', (data) => {
      setAuctions(data.ongoing)
    })
  }, [])

  return (
    <>
      {/* TODO 1: add search functionality */}
      <div className="home-page">
        <div className="home-header">
          <input
            type="text"
            name="search"
            className="search-bar"
            placeholder="What are you looking for?"
          />
          <NavLink to="">
            <img src="design-images/cart.png" alt="cart" />
          </NavLink>
        </div>
        <div className="home-body">
          <div className="home-categories">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
          <div className="items-container">
            {auctions &&
              auctions.map((auction) => (
                <ItemCard key={auction._id} auction={auction} />
              ))}
          </div>
        </div>
        <NavBar />
      </div>

    </>
  )
}

export default Home
