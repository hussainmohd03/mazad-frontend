import React, { useEffect, useState } from 'react'
import NavBar from '../components/AdminNav'
import Client from '../../services/api'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
const backendUrl = import.meta.env.VITE_BACKEND_URL

const AdminDashboard = () => {
  const [listings, setListings] = useState([])
  const [users, setUsers] = useState([])
  const [biddings, setBiddings] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await Client.get(`${backendUrl}/users/allusers`)
        setUsers(res.data)
      } catch (error) {
        console.error('Error fetching Users:', error)
      }
    }

    const fetchListings = async () => {
      try {
        const res = await Client.get(`${backendUrl}/admin/items`)
        setListings(res.data.item || [])
      } catch (error) {
        console.error('Error fetching listings:', error)
      }
    }

    const fetchBidding = async () => {
      try {
        const res = await Client.get(`${backendUrl}/admin/allbiddings`)
        setBiddings(res.data)
      } catch (error) {
        console.error('Error fetching Biddings:', error)
      }
    }
    fetchUsers()
    fetchListings()
    fetchBidding()
  }, [])

  // counter for the line chart
  const totalListed = listings.length
  const approvedListed = listings.filter((l) => l.status === 'approved').length
  const rejectedListed = listings.filter((l) => l.status === 'rejected').length

  // Users approved or not
  const approvedUsers = users.filter((u) => u.verified === true).length
  const notApprovedUsers = users.filter((u) => u.verified === false).length
  const totalUsers = users.length

  const userData = [
    { name: 'verified', value: approvedUsers },
    { name: 'Not verified', value: notApprovedUsers }
  ]
  const COLORS = ['#16a34a', '#dc2626']
  //  Biddings over time (group by date)
  const biddingData = biddings.reduce((acc, bid) => {
    const date = new Date(bid.createdAt).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  const biddingChartData = Object.keys(biddingData).map((date) => ({
    date,
    count: biddingData[date]
  }))

  return (
    <>
      <NavBar />
      <div className="Admin-dashboard-container">
        <h2 className="Dashboard-title">Dashboard</h2>
        <div className="Total-listed-items"></div>
        <div className="aproved-items"></div>
        <div className="rejected-items"></div>
        <div className="total-users"></div>
        <div className="all-biddings-over-time"></div>
      </div>
    </>
  )
}

export default AdminDashboard
