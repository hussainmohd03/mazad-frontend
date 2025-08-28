import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'
import { useContext } from 'react'
import UserContext from '../context/UserContext'
const EditProfile = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

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
  }

  useEffect(() => {
    const getUserProfile = async () => {
      const res = await Client.get(`${BASE_URL}/users/me`)
      setOldSets(res.data.user)
    }

    getUserProfile()
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
