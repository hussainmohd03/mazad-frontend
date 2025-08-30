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
  Cell,
  Area
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
        <div className="Total-listed-items">
          <p className="p-in-dashbaard">Statistics</p>
          <h3>Total Listed Items</h3>
          <p style={{ fontSize: '24px', fontWeight: '600' }}>{totalListed}</p>
        </div>
        <div className="aproved-items">
          <p className="p-in-dashbaard">Statistics</p>
          <h3>Approved Items</h3>
          <p style={{ fontSize: '24px', fontWeight: '600' }}>
            {approvedListed}
          </p>
        </div>
        <div className="rejected-items">
          <p className="p-in-dashbaard">Statistics</p>
          <h3>Rejected Items</h3>
          <p style={{ fontSize: '24px', fontWeight: '600' }}>
            {rejectedListed}
          </p>
        </div>
        <div className="total-users">
          <p className="p-in-dashbaard-user">Statistics</p>
          <h3>Total Users</h3>
          <p
            className="total-users-title"
            style={{
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: '600'
            }}
          >
            Total Count: {totalUsers}
          </p>
          <hr />
          <ResponsiveContainer width="100%" height="65%" className="pie-chart">
            <PieChart>
              <Pie
                data={userData}
                dataKey="value"
                cx="50%"
                cy="70%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={100}
                cornerRadius={5}
                paddingAngle={5}
              >
                {userData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="all-biddings-over-time">
          <p className="p-in-dashbaard-user">Statistics</p>
          <h3>Biddings Over Time</h3>
          <ResponsiveContainer width="95%" height="75%">
            <LineChart data={biddingChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(dateStr) =>
                  new Date(dateStr).toLocaleString('en-UK', { month: 'short' })
                }
              />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#2563eb"
                strokeWidth={2}
                fillOpacity={0.9}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
