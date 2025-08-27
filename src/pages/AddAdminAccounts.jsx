import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Register } from '../../services/Auth'
const backendUrl = import.meta.env.VITE_BACKEND_URL

const AdminListingDetails = () => {
  return (
    <div className="AdminListingDetails-container">
      <div className="both-logos">
        <img
          className="logo2-AdminListingDetails"
          src="/design-images/logo.svg"
        />
        <img
          className="logo1-AdminListingDetails"
          src="/design-images/logo.png"
        />
      </div>
      <div className="add-admin"></div>
    </div>
  )
}

export default AdminListingDetails
