import React, { useEffect, useState } from 'react'
import NavBar from '../components/AdminNav'
import Client from '../../services/api'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
const backendUrl = import.meta.env.VITE_BACKEND_URL
ChartJS.register(ArcElement, Tooltip, Legend)

const AdminDashboard = () => {
  const [listings, setListings] = useState([])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await Client.get(`${backendUrl}/admin/items`)
        setListings(res.data.item || [])
      } catch (error) {
        console.error('Error fetching listings:', error)
      }
    }
    fetchListings()
  }, [])

  const statusCounts = listings.reduce((acc, item) => {
    const status = item.status || 'pending'
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {})

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Total: ',
        data: Object.values(statusCounts),
        backgroundColor: ['#facc15', '#dc2626', '#16a34a'],
        borderColor: ['#fff', '#fff', '#fff'],
        borderWidth: 3
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Items by Status' }
    }
  }

  return (
    <>
      <NavBar />
      <div className="Admin-dashboard-container">
        <h2>Dashboard</h2>

        <div className="chart-box">
          <Doughnut
            data={chartData}
            options={{ ...chartOptions, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </>
  )
}

export default AdminDashboard
