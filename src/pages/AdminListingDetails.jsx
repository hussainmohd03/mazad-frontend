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
      }
    }
    fetchListing()
  }, [])

  const handleApprove = async () => {
    try {
      const res = await Client.put(`{backendUrl}/admin/items/${id}/approve`)
      setListing(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="admin-layout">
      <AdminNav />
    </div>
  )
}

export default AdminListingDetails
