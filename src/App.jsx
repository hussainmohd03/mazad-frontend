import './App.css'
import Client from '../services/api'
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
import AdminSignUp from './pages/AdminSignUp'
import TopUp from './pages/TopUp'
import EditProfile from './pages/EditProfile'
import { useEffect } from 'react'
import { CheckSession } from '../services/Auth'
import UserContext from './context/UserContext'
import ChangePassword from './pages/ChangePassword'
import ItemForm from './components/ItemForm'
import CategorizedItems from './components/CategorizedItems'
import Transaction from './pages/Transaction'
import AdminListings from './pages/AdminListings'
import AdminSignIn from './pages/AdminSignIn'
import AdminListingDetails from './pages/AdminListingDetails'
import AdminDashboard from './pages/AdminDashboard'
import Notificiation from './components/Notification'

import { BASE_URL } from "../globals";
import { io } from "socket.io-client";
const socket = io("http://localhost:5045");

const App = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [financialData, setFinancialData] = useState({});
  const [notification, setNotification] = useState("");

  const checkToken = async () => {
    const user = await CheckSession();
    setUser(user);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken();
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (user.id) {
      socket.emit("joinUser", user.id);
      socket.on("notify", (notif) => {
        setNotification(notif);
      });
    }
  }, [notification, socket, user]);

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
    navigate("/sign-in");
  };

  const handleDeleteAccount = async () => {
    await Client.delete(`${BASE_URL}/users/me`);
    setUser(null);
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <>
      {notification && (
        <Notificiation
          notification={notification}
          setNotification={setNotification}
        />
      )}
      {/* <Notificiation
        notification={notification}
        setNotification={setNotification}
      /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sell" element={<Sell />} />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              notification={notification}
              setNotification={setNotification}
            />
          }
        />
        <Route path="/item-form" element={<ItemForm />} />
        <Route
          path="/profile"
          element={
            <Profile
              handleLogOut={handleLogOut}
              financialData={financialData}
              setFinancialData={setFinancialData}
              handleDeleteAccount={handleDeleteAccount}
              notification={notification}
              setNotification={setNotification}
            />
          }
        />
        <Route
          path="/activity"
          element={
            <Activity
              notification={notification}
              setNotification={setNotification}
            />
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/auctions/:auctionId" element={<ItemDetails />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="/admin/sign-in" element={<AdminSignIn />} />
        <Route path="/admin/sign-up" element={<AdminSignUp />} />
        <Route path="/admin/listings" element={<AdminListings />} />
        <Route path="/admin/listings/:id" element={<AdminListingDetails />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/top-up"
          element={
            <TopUp
              financialData={financialData}
              setFinancialData={setFinancialData}
            />
          }
        />
        <Route path="/category/:name" element={<CategorizedItems />} />
      </Routes>
    </>
  );
};

export default App;
