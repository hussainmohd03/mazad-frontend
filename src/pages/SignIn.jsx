import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { Login } from '../../services/Auth'
import UserContext from '../context/UserContext'

const SignIn = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    const user = await Login(formData)
    setFormData({ email: '', password: '' })
    setUser(user.user)
    navigate('/home')
  }

  return (
    <div className="sign-page">
      <form className="sign-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <label htmlFor="email" className="input-key">
          Email address
        </label>
        <input
          type="email"
          placeholder="Enter your email address (required)"
          name="email"
          onChange={handleChange}
          required
          className="input-field"
        />
        <label htmlFor="password" className="input-key">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password (required)"
          onChange={handleChange}
          required
          className="input-field"
        />
        <button type="submit" className="sign-button">
          Sign in
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
        {/* <img src="design-images\or.png" alt="or" />
        <button className="google-btn">
          <img src="design-images\google.png" alt="" />
          Sign up with Google
        </button> */}
        <p className="sign-alternative">
          Don't have an account? <NavLink to="/sign-up">SIGN UP</NavLink>
        </p>
      </form>
    </div>
  )
}

export default SignIn
