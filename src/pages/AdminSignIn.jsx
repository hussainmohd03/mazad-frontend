import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import Client from '../../services/api'
const backendUrl = import.meta.env.VITE_BACKEND_URL

const AdminListingDetails = () => {
  return (
    <div className="AdminListingDetails-container">
      <div className="both-logos">
        <img
          className="logo2-AdminListingDetails"
          src="/design-images/logo.svg"
          alt="logo-image"
        />
        <img
          className="logo1-AdminListingDetails"
          src="/design-images/logo.png"
          alt="logo-image"
        />
      </div>
      <div className="add-admin">
        <form
          className="add-admin-form"
          // onSubmit={handleSubmit}
        >
          <p className="pp">Sign in</p>

          <div className="form-row">
            <label htmlFor="email" className="input-key-admin">
              Email address
            </label>
            <input
              className="input-field-admin"
              type="email"
              placeholder="Enter email"
              name="email"
              // value={formData.email}
              // onChange={handleChange}
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
              // value={formData.password}
              // onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="sign-button-admin">
            Sign in
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
          <p className="sign-alternative-signin">
            Already have an account? <NavLink to="/sign-in">SIGN IN</NavLink>
          </p>
        </form>
      </div>
    </div>
  )
}

export default AdminListingDetails
