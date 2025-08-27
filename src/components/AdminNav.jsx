import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminNav = () => {
  const navigate = useNavigate()

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
        <span>
          <img src="/design-images/AdminNav dashboard icon.svg" alt="icon" />
          <button onClick={() => navigate('/admin/dashboard')}>
            Dashboard
          </button>
        </span>
        <span>
          <img src="/design-images/AdminNav req icon.svg" alt="icon" />
          <button
            onClick={() => navigate('/admin/listings')}
            className="active"
          >
            Listings
          </button>
        </span>
        <span>
          <img src="/design-images/AdminNav Mask group.svg" alt="icon" />
          <button onClick={() => navigate('/admin/categories')}>
            Category
          </button>
        </span>
        <span>
          <img src="/design-images/AdminNav sitting icon.svg" alt="icon" />
          <button onClick={() => navigate('/admin/settings')}>Settings</button>
        </span>
        <span>
          <img src="/design-images/AdminNav admin icon.svg" alt="icon" />
          <button onClick={() => navigate('/admin/admins')}>Admins</button>
        </span>
        <div className="spacer"></div>
        <button id="logout-btn">Log out</button>
      </nav>
    </div>
  )
}

export default AdminNav
