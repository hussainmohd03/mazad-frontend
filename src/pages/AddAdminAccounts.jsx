import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterAdmin } from '../../services/Auth'
import Client from '../../services/api'
const backendUrl = import.meta.env.VITE_BACKEND_URL

const AdminListingDetails = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    try {
      console.log('enters trycatch')
      const admin = await RegisterAdmin(`${backendUrl}/auth/admin/signup`, {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password
      })
      console.log('registered admin', admin)
      setSuccess('Admin created successfully')
      setFormData({
        full_name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create admin')
    }
  }

  return (
    <div className="AdminListingDetails-container">
      <div className="both-logos">
        <img
          className="logo2-AdminListingDetails"
          src="/design-images/logo.svg"
          alt="logo-image"
        />
        <img
          onClick={() => navigate('/admin/listings')}
          className="logo1-AdminListingDetails"
          src="/design-images/logo.png"
          alt="logo-image"
        />
      </div>
      <div className="add-admin">
        <form className="add-admin-form" onSubmit={handleSubmit}>
          <p className="pp">Add Admin</p>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
          <div className="form-row">
            <label htmlFor="full_name" className="input-key-admin">
              Full name
            </label>
            <input
              className="input-field-admin"
              type="text"
              placeholder="Enter full name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email" className="input-key-admin">
              Email address
            </label>
            <input
              className="input-field-admin"
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password" className="input-key-admin">
              Password
            </label>
            <input
              className="input-field-admin"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label htmlFor="confirmPassword" className="input-key-admin">
              Confirm password
            </label>
            <input
              className="input-field-admin"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="sign-button-admin">
            Add admin
          </button>
          <br />
          <div className="terms-admin">
            <img
              className="lock-img"
              src="/design-images/lock_icon.svg"
              alt="lock-img"
            />
            <p>
              By continuing you agree to Mazad’s
              <a href="">Terms and conditions</a> and
              <a href="">Privacy Policy</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminListingDetails
