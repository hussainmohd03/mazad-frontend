import React from 'react'
import NavBar from '../components/NavBar'
import UserContext from '../context/UserContext'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Profile = () => {
  const { user } = useContext(UserContext)
  const [name, setName] = useState('')
  useEffect(() => {
    setName(user.first_name)
  }, )

  return (
    <div>
      Profile
      <br />
      <img src="/design-images/default_icon.svg" alt="" />
      {name}
      <Link>Edit profile</Link>
      <NavBar />
    </div>
  )
}

export default Profile
