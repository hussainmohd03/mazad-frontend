import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminNav from '../components/AdminNav'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'
import { useNavigate } from 'react-router-dom'
const backendUrl = import.meta.env.VITE_BACKEND_URL

const AdminListingDetails = () => {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mainImage, setMainImage] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await Client.get(`${BASE_URL}/admin/items`)
        const item = res.data.item.find((i) => i._id == id)
        setListing(item)
        setMainImage(item?.images[0] || null)
      } catch (err) {
        setError('Failed to fetch listing details')
      } finally {
        setLoading(false)
      }
    }
    fetchListing()
  }, [])
  const updateStatus = async (action) => {
    try {
      console.log(`${BASE_URL}/admin/items/${id}/updateItem?action=${action}`)
      const res = await Client.put(
        `${BASE_URL}/admin/items/${id}/updateItem?action=${action}`
      , )
      setListing(res.data)
      navigate('/admin/listings')
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
        <p className="listing-title-in-p">listing Details</p>
        <div className="listing-details">
          <p className="category-name-blue">
            <strong>{listing.category}</strong>
          </p>
          <p className="category-name-black">
            <strong>{listing.name}</strong>
          </p>
          <p>
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'BHD',
              minimumFractionDigits: 0
            }).format(listing.price)}
          </p>
          <p className="listing-description">{listing.description}</p>
        </div>

        <div className="action-buttons">
          <button
            className="approve-btn"
            onClick={() => updateStatus('approved')}
            disabled={listing.status === 'approved'}
          >
            Approve
          </button>
          <button
            className="reject-btn"
            onClick={() => updateStatus('rejected')}
            disabled={listing.status === 'rejected'}
          >
            Reject
          </button>
          <button
            className="pending-btn"
            onClick={() => updateStatus('pending')}
            disabled={listing.status === 'pending'}
          >
            Set Pending
          </button>
        </div>
      </div>
      <div className="images">
        <div className="large-image-container">
          <img
            src={mainImage}
            alt="Main Listing"
            className="large-listing-img"
          />
        </div>

        <div className="thumbnails">
          {listing.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumbnail ${i}`}
              className="listing-img"
              onMouseEnter={() => setMainImage(img)}
              onMouseLeave={() => setMainImage(listing.images[0])}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminListingDetails
