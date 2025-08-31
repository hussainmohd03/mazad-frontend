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
  Label,
  Area,
  AreaChart
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
    { name: 'Sellers', value: approvedUsers },
    { name: 'Users', value: notApprovedUsers },
    { name: 'Both', value: totalUsers }
  ]
  const COLORS = ['#16537e', '#ffd966', '#f44336']

  // Group listings by date and status
  const listingsOverTime = listings.reduce((acc, listing) => {
    const date = new Date(listing.updatedAt).toLocaleDateString()

    if (!acc[date]) {
      acc[date] = { date, total: 0, approved: 0, rejected: 0 }
    }

    acc[date].total += 1
    if (listing.status === 'approved') acc[date].approved += 1
    if (listing.status === 'rejected') acc[date].rejected += 1

    return acc
  }, {})

  const listingsChartData = Object.values(listingsOverTime).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )

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
          <h3>Listed Items Overview</h3>
          <p style={{ fontSize: '24px', fontWeight: '600' }}>{totalListed}</p>
          <ResponsiveContainer
            width="12%"
            height="12%"
            className="Responsive-Container-1"
          >
            <LineChart data={listingsChartData}>
              <Tooltip />
              <Line
                dataKey="total"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="aproved-items">
          <p className="p-in-dashbaard">Statistics</p>
          <h3>Approved Items</h3>
          <p style={{ fontSize: '24px', fontWeight: '600' }}>
            {approvedListed}
          </p>
          <ResponsiveContainer
            width="12%"
            height="12%"
            className="Responsive-Container-2"
          >
            <LineChart data={listingsChartData}>
              <Tooltip />
              <Line
                dataKey="approved"
                stroke="#16a34a"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rejected-items">
          <p className="p-in-dashbaard">Statistics</p>
          <h3>Rejected Items</h3>
          <p style={{ fontSize: '24px', fontWeight: '600' }}>
            {rejectedListed}
          </p>
          <ResponsiveContainer
            width="12%"
            height="12%"
            className="Responsive-Container-3"
          >
            <LineChart data={listingsChartData}>
              <Tooltip />
              <Line
                dataKey="rejected"
                stroke="#dc2626"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="total-users">
          <p className="p-in-dashbaard-user">Statistics</p>
          <h3>Total Users</h3>

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
                paddingAngle={-5}
              >
                {userData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
                <Label
                  value={`Total: ${totalUsers}`}
                  position="center"
                  fill="#333"
                  style={{
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                />
              </Pie>

              <Tooltip />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="all-biddings-over-time">
          <p className="p-in-dashbaard-user">Statistics</p>
          <h3>Biddings Over Time</h3>
          <ResponsiveContainer width="95%" height="75%">
            <AreaChart data={biddingChartData}>
              <CartesianGrid strokeDasharray="6 6" />
              <XAxis
                dataKey="date"
                tickFormatter={(dateStr) =>
                  new Date(dateStr).toLocaleString('en-UK', { month: 'short' })
                }
              />
              <YAxis />
              <Tooltip />
              <Legend />

              <Area
                dataKey="count"
                stroke="#2563eb"
                fill="#93c5fd"
                strokeWidth={3}
                fillOpacity={0.3}
                dot={{ r: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
