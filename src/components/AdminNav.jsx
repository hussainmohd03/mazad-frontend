import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminNav = () => {
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.clear()
    navigate('/admin/signin')
  }

  return (
    <div className="admin-nav-out">
      <nav className="admin-nav">
        <div className="logo">
          <span className="red-text">
            <img src="/design-images/logo.svg" alt="Logo" />
          </span>
        </div>
        <button
          onClick={() => navigate('/admin/AddAdminAccount')}
          className="new-admin-btn"
        >
          + New Admin
        </button>

        <span className="sp1">
          <img src="/design-images/AdminNav dashboard icon.svg" alt="icon" />
          <button onClick={() => navigate('/admin/dashboard')}>
            Dashboard
          </button>
        </span>
        <span className="sp2">
          <img src="/design-images/AdminNav req icon.svg" alt="icon" />
          <button onClick={() => navigate('/admin/listings')}>Listings</button>
        </span>
        <span className="sp3">
          <img src="/design-images/AdminNav Mask group.svg" alt="icon" />
          <button onClick={() => navigate('/admin/categories')}>
            Category
          </button>
        </span>
        <span className="sp4">
          <img src="/design-images/AdminNav sitting icon.svg" alt="icon" />
          <button onClick={() => navigate('/admin/settings')}>Settings</button>
        </span>
        <span className="sp5">
          <img src="/design-images/AdminNav admin icon.svg" alt="icon" />
          <button onClick={() => navigate('/admin/admins')}>Admins</button>
        </span>
        <div className="spacer"></div>
        <button id="logout-btn" onClick={handleLogOut}>
          Log out
        </button>
      </nav>
    </div>
  )
}

export default AdminNav
