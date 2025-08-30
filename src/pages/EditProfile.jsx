import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'
import { useContext } from 'react'
import UserContext from '../context/UserContext'
import { io } from 'socket.io-client'
const socket = io('http://localhost:5045')

const EditProfile = ({ setNotification }) => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })
  const [id, setId] = useState('')

  const [oldDetails, setOldSets] = useState({})

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
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

    // socket.on here to update ui

    socket.on('updateAccount', (notification) => {
      // setNotification(notification)
      console.log('from frontend', notification)
    })

    // socket.emit('disconnect')

    // setNotification('Profile updated successfully')
    navigate('/profile')
  }

  useEffect(() => {
    const getUserProfile = async () => {
      socket.emit('connection')
      const res = await Client.get(`${BASE_URL}/users/me`)
      setOldSets(res.data.user)
    }

    getUserProfile()
    console.log(user.id)
    socket.emit('joinUser', user.id)
    return () => {
      socket.emit('leaveUser', user.id)
    }
  }, [])
  return (
    <>
      <p className="profile-header">Edit Personal Info</p>
      <img src="/design-images/default_icon.svg" alt="" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName" className="input-key">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          placeholder={user.first_name}
          value={userDetails.firstName}
          onChange={handleChange}
        />

        <label htmlFor="lastName" className="input-key">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          placeholder={user.last_name}
          value={userDetails.lastName}
          onChange={handleChange}
        />

        <label htmlFor="email" className="input-key">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder={user.email}
          value={userDetails.email}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </>
  )
}

export default EditProfile
