import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav'
import axios from 'axios'
import ListingTable from '../components/ListingTable'
const backendUrl = import.meta.env.VITE_BACKEND_URL

const AdminListings = () => {
  const [listings, setListings] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(`${backendUrl}/admin/items`)
        setListings(res.data)
        console.log(res.data) // there are data
      } catch (error) {
        console.error('Error fetching listings:', error)
      }
    }
    fetchListings()
  }, [])
  const filteredListings = listings.filter((listing) => {
    if (filter === 'all') return true
    return listing.status === filter
  })

  return (
    <div className="admin-page">
      <AdminNav />

      <div className="content">
        <h1>Listings</h1>

        <div className="filter-buttons">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('approved')}>Complete</button>
          <button onClick={() => setFilter('pending')}>Pending</button>
          <button onClick={() => setFilter('rejected')}>Rejected</button>
        </div>
        {filteredListings.length === 0 ? (
          <p> No listings found for this status. </p>
        ) : (
          <ListingTable listings={filteredListings} />
        )}
      </div>
    </div>
  )
}

export default AdminListings
