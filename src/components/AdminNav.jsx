import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminNav = () => {
  const navigate = useNavigate()

  return (
    <nav className="admin-nav">
      <button className="new-admin-btn">+ New Admin</button>
      <button onClick={() => navigate('/admin/dashboard')}>Dashboard</button>
      <button className="active">Listings</button>
      <button onClick={() => navigate('/admin/categories')}>Category</button>
      <button onClick={() => navigate('/admin/settings')}>Settings</button>
      <button onClick={() => navigate('/admin/admins')}>Admins</button>
    </nav>
  )
}

export default AdminNav
