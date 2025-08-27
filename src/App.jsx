import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Sell from './pages/Sell'
import Watchlist from './pages/Watchlist'
import Profile from './pages/Profile'
import Activity from './pages/Activity'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ItemDetails from './components/ItemDetails'
import EditProfile from './pages/EditProfile'
import { useEffect } from 'react'
import { CheckSession } from '../services/Auth'
import UserContext from './context/UserContext'
import ChangePassword from './pages/ChangePassword'

const App = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    } else {
      navigate('/')
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
    navigate('/sign-in')
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route
          path="/profile"
          element={<Profile handleLogOut={handleLogOut} />}
        />
        <Route path="/activity" element={<Activity />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/auctions/:auctionId" element={<ItemDetails />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Routes>
    </>
  )
}

export default App
