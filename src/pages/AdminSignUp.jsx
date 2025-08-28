import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { RegisterAdmin } from '../../services/Auth'

const AdminSignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const admin = await RegisterAdmin(
      formData.full_name,
      formData.email,
      formData.password
    )
    console.log('admin', admin)
    setFormData({
      full_name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    navigate('/admin/sign-in')
  }

  return (
    <div className="sign-page">
      <form className="sign-form" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label htmlFor="full_name" className="input-key">
          Full name
        </label>
        <input
          className="input-field"
          type="text"
          placeholder="Enter your full name (required)"
          name="full_name"
          onChange={handleChange}
          required
        />
        <label htmlFor="email" className="input-key">
          Email address
        </label>
        <input
          className="input-field"
          type="email"
          placeholder="Enter your email address (required)"
          name="email"
          onChange={handleChange}
          required
        />
        <label htmlFor="password" className="input-key">
          Password
        </label>
        <input
          className="input-field"
          type="password"
          name="password"
          placeholder="Enter your password (required)"
          onChange={handleChange}
          required
        />
        <label htmlFor="confirmPassword" className="input-key">
          Confirm password
        </label>
        <input
          className="input-field"
          type="password"
          name="confirmPassword"
          placeholder="Re-enter your password (required)"
          onChange={handleChange}
          required
        />
        <button type="submit" className="sign-button">
          Sign up
        </button>
        <br />
        <div className="terms">
          <img src="/design-images/lock_icon.svg" alt="lock-img" />
          <p>
            By continuing you agree to Mazad’s{' '}
            <a href="">Terms and conditions</a> and{' '}
            <a href="">Privacy Policy</a>
          </p>
        </div>
        <p className="sign-alternative">
          Already have an account? <NavLink to="/sign-in">SIGN IN</NavLink>
        </p>
      </form>
    </div>
  )
}

export default AdminSignUp
