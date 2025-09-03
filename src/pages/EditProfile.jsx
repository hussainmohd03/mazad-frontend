import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'
import { useContext } from 'react'
import UserContext from '../context/UserContext'
import { io } from 'socket.io-client'
const socket = io('https://mazad-704ecf2af46e.herokuapp.com:5045')

const EditProfile = ({ setNotification, notification }) => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    companyReg: ''
  })
  const [id, setId] = useState('')
  const [oldDetails, setOldSets] = useState({})
  const [isChanged, setIsChanged] = useState(false)

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    setIsChanged(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedProfile = await Client.put(`${BASE_URL}/users/me`, userDetails)
    setUser({
      id: updatedProfile.data.user._id,
      email: updatedProfile.data.user.email,
      first_name: updatedProfile.data.user.firstName,
      last_name: updatedProfile.data.user.lastName,
      role: updatedProfile.data.user.type
    })
    setId(updatedProfile.data.user._id)
    navigate('/profile')
  }

  useEffect(() => {
    const getUserProfile = async () => {
      socket.emit('connection')
      const res = await Client.get(`${BASE_URL}/users/me`)
      setOldSets(res.data.user)
      setUserDetails({
        firstName: res.data.user.firstName || '',
        lastName: res.data.user.lastName || '',
        email: res.data.user.email || ''
      })
    }
    getUserProfile()
    socket.emit('joinUser', user.id)
    return () => {
      socket.emit('leaveUser', user.id)
    }
  }, [])

  return (
    <div className=".edit-profile-container">
      <div className="change-pass-header-container edit-profile-header">
        <img
          onClick={() => navigate(-1)}
          src="/design-images/back-arrow-with-circle.svg"
          alt="back-arrow-with-circle"
        />
        <div className="change-pass-header edit-header">Edit Personal Info</div>
      </div>
      <div className="profile-img-section">
        <div className="profile-img-wrapper">
          <img
            src="/design-images/default_icon.svg"
            alt="Profile"
            className="profile-img"
          />
        </div>
      </div>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>First name</label>

          <input
            type="text"
            name="firstName"
            value={userDetails.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Last name</label>

          <input
            type="text"
            name="firstName"
            value={userDetails.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <button type="submit" className="save-btn" disabled={!isChanged}>
          Save
        </button>
      </form>
    </div>
  )
}

export default EditProfile
