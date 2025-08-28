import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'

const EditProfile = () => {
  const navigate = useNavigate()

  const [userDetails, setUserDetails] = useState({
    first_name: '',
    email: ''
  })

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedProfile = await Client.put(`${BASE_URL}/users/me`, {
      userDetails
    })
    console.log(updatedProfile)
  }

  useEffect(()=> {

  }, [])
  return (
    <>
      <p className="profile-header">Edit Personal Info</p>
      <img src="/design-images/default_icon.svg" alt="" />
      <form>
        <label htmlFor="name" className="input-key">
          Name
        </label>
        <input type="text" />
      </form>
    </>
  )
}

export default EditProfile
