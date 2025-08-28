import NavBar from '../components/AdminNav'
import { listAuctions } from '../../services/Auction'
import React, { useEffect, useState } from 'react'
import Client from '../../services/api'
const backendUrl = import.meta.env.VITE_BACKEND_URL
const AdminDashboard = () => {
  listAuctions()
  return (
    <>
      <NavBar />
    </>
  )
}

export default AdminDashboard
