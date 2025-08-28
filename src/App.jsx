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
import TopUp from './pages/TopUp'
import EditProfile from './pages/EditProfile'
import { useEffect } from 'react'
import { CheckSession } from '../services/Auth'
import UserContext from './context/UserContext'
import ChangePassword from './pages/ChangePassword'
// import 'bootstrap/dist/css/bootstrap.min.css'
import AdminListings from './pages/AdminListings'
// import AdminDashboard from './pages/admin/AdminDashboard'
// import AdminCategories from './pages/admin/AdminCategories'
// import AdminSettings from './pages/admin/AdminSettings'
// import AdminAccounts from './pages/admin/AdminAccounts'
import AdminListingDetails from './pages/AdminListingDetails'
const App = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [financialData, setFinancialData] = useState({})

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
          element={
            <Profile
              handleLogOut={handleLogOut}
              financialData={financialData}
              setFinancialData={setFinancialData}
            />
          }
        />
        <Route path="/activity" element={<Activity />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/auctions/:auctionId" element={<ItemDetails />} />

        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="change-password" element={<ChangePassword />} />

        {/* Admin routes */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        <Route path="/admin/listings" element={<AdminListings />} />
        <Route path="/admin/listings/:id" element={<AdminListingDetails />} />
        {/* <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/admins" element={<AdminAccounts />} /> */}
        <Route
          path="/top-up"
          element={
            <TopUp
              financialData={financialData}
              setFinancialData={setFinancialData}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
