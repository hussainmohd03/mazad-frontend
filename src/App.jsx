import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Sell from './pages/Sell'
import Watchlist from './pages/Watchlist'
import Profile from './pages/Profile'
import Activity from './pages/Activity'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ItemDetails from './components/ItemDetails'

// 🔹 Import admin pages
import AdminListings from './pages/AdminListings'
import AdminSignIn from './pages/AdminSignIn'
import AddAdminAccounts from './pages/AddAdminAccounts'
import AdminListingDetails from './pages/AdminListingDetails'
// import AdminDashboard from './pages/AdminDashboard'
// import AdminCategories from './pages/AdminCategories'
// import AdminSettings from './pages/AdminSettings'
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/auctions/:auctionId" element={<ItemDetails />} />

        {/* Admin routes */}
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route path="/admin/listings" element={<AdminListings />} />
        <Route path="/admin/listings/:id" element={<AdminListingDetails />} />
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        {/* <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/settings" element={<AdminSettings />} />*/}
        <Route path="/admin/AddAdminAccount" element={<AddAdminAccounts />} />
      </Routes>
    </>
  )
}

export default App
