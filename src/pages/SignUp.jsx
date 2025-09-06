import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Register } from '../../services/Auth'
import emailjs from '@emailjs/browser'

const SignUp = ({ message, setMessage }) => {
  const serviceId = 'service_xfa2nmx'
  const templateId = 'template_inrpxj1'
  const publicKey = 'Fxi0xwrKA_XPTOzbg'
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [condition, setCondition] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const checkRequirements = () => {
    const symbols = ['@', '%', '&', '#']
    for (let i = 0; i < formData.password.length; i++) {
      if (formData.password[i] in symbols) {
        if (
          formData.password === formData.confirmPassword &&
          formData.password.length > 8
        ) {
          return setCondition(true)
        }
      }
    }

    return setMessage(
      'Password must be 8 characters long and contain special characters.'
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (formData.full_name.includes(' ')) {
        checkRequirements()
        setTimeout(() => {
          setMessage('')
        }, 2000)
        if (condition) {
          const response = await Register(
            formData.full_name,
            formData.email,
            formData.password
          )
          console.log('frontend', response)
          const templateParams = {
            firstName: formData.full_name.split(' ')[0],
            name: formData.full_name,
            status: 'registered successfully',
            email: formData.email
          }
          await emailjs.send(serviceId, templateId, templateParams, publicKey)

          setFormData({
            full_name: '',
            email: '',
            password: '',
            confirmPassword: ''
          })
          navigate('/sign-in')
        }
      } else {
        setMessage('Please enter your full name.')
        setTimeout(() => {
          setMessage('')
        }, 2000)
      }
    } catch (error) {
      setMessage(error.response.data.msg)
      setTimeout(() => {
        setMessage('')
      }, 2000)
    }
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
        <p className="less-tiny-text top-padding side-indentation">{message}</p>
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

export default SignUp
