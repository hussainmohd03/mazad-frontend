import React from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../../services/api'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../../globals'
import { useParams } from 'react-router-dom'
import ItemCard from './ItemCard'

const CategorizedItems = () => {
  const [auctions, setAuctions] = useState([])
  const { name } = useParams()
  useEffect(() => {
    const getAuctionsByCategory = async () => {
      const auctions = await Client.get(
        `${BASE_URL}/auctions/category?name=${name}`
      )
      setAuctions(auctions.data)
    }
    getAuctionsByCategory()
  }, [])
  const navigate = useNavigate()
  return (
    <div className="auction-page ">
      <div className="auction-header-container">
        <img
          onClick={() => navigate(-1)}
          src="/design-images/back-arrow-with-circle.svg"
          alt="back"
        />
        <div className="auction-page-header">Auctions</div>
      </div>
      <div className="items-container">
        {auctions.map((auction) => (
          <ItemCard key={auction._id} auction={auction} />
        ))}
      </div>
    </div>
  )
}

export default CategorizedItems
