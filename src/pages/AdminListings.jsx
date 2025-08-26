import React, { useEffect, useState } from 'react'
import AdminNav from '../components/AdminNav'
import axios from 'axios'
// import ListingTable from '../components/ListingTable'
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
  // console.log(listings)
  const filteredListings = listings.filter((listing) => {
    if (filter === 'all') return true
    return listing.status === filter
  })

  return (
    <div className="admin-page">
      <AdminNav />
    </div>
  )
}

export default AdminListings
