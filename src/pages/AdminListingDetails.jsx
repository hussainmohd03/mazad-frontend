import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminNav from '../components/AdminNav'
import Client from '../../services/api'
const backendUrl = import.meta.env.VITE_BACKEND_URL

const AdminListingDetails = () => {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await Client.get(`${backendUrl}/admin/items`)
        const item = res.data.find((i) => i._id == id)
        console.log(item) // for testing
        setListing(item)
      } catch (err) {
        setError('Failed to fetch listing details')
      } finally {
        setLoading(false)
      }
    }
    fetchListing()
  }, [])

  const handleApprove = async () => {
    try {
      const res = await Client.put(`{backendUrl}/admin/items/${id}/updateItem`)
      setListing(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const updateStatus = async (action) => {
    try {
      const res = await Client.put(
        `${backendUrl}/admin/items/${id}/updateItem?action=${action}`
      )
      setListing(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <p className="loading-text"> Loading... </p>
  if (error) return <p>{error}</p>
  if (!listing) return <p>No details found </p>
  return (
    <div className="admin-layout">
      <AdminNav />
      <div className="admin-content">
        <h1>{listing.name} Details</h1>
        <div className="listing-details">
          <p className="category-name-blue">{listing.category}</p>
          <p>
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'BHD',
              minimumFractionDigits: 0
            }).format(listing.price)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminListingDetails
