import React from 'react'
import NavBar from '../components/NavBar'
import UserContext from '../context/UserContext'
import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'
import AreaChartComponent from '../components/AreaChat'

const Profile = ({ handleLogOut }) => {
  const { user } = useContext(UserContext)
  const [name, setName] = useState('')
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    user && setName(user.first_name)
  })
  
  useEffect(() => {
    const getBalance = async () => {
      const user = await Client.get(`${BASE_URL}/users/me`)
      setBalance(user.data.user.balance)
    }

    getBalance()
  }, [])

  return (
    
    <div className='profile-page'>
      <header>
        <div className='profile-details'>
          <div className='profile-title'>Profile</div>
          <div className='profile-user-details'>
            <img src="/design-images/default_icon.svg" alt="" />
            <div className='profile-username'>
              <p className='primary-text'>{name}</p>
              <NavLink to={'/edit-profile'} className="edit-profile-button">
                Edit profile
              </NavLink>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="bidding-limit-container">
        <div className="your-bidding-limit-inner-container">
          <p className="your-bidding-limit-text">Your Bidding Limit</p>
          <div className="your-bidding-limit-details">
            <div className="graph-chart">
              <AreaChartComponent />
            </div>
            <div>
              <p className="tiny-text">Total bidding limit</p>
              <p className="less-tiny-text">BHD 0</p>
              <p className="tiny-text">Remaning</p>
              <p className="less-tiny-text red-text">BHD {balance}</p>
            </div>
          </div>
        </div>
        <div className="bidding-limit-container-footer">
          <div>
            <p className="bidding-limit-footer-text tiny-text  lighter-grey">
              Deposited amount
            </p>
            <p className="bidding-limit-footer-text deposited-amount less-tiny-text">
              BHD 0
            </p>
          </div>
          <div className="top-up-div">
            <button className=" bidding-top-up-button bold-button">
              Top up +
            </button>
          </div>
        </div>
      </div>
      <div className='profile-footer'>
        <p className="primary-text">Settings</p>
        <div >
          <img
          src="/design-images/password.svg"
          alt=""
          />
          <p > <NavLink to='/change-password'>Change password</NavLink></p>
      </div>
      <div>
        <img src="/design-images/log_out.svg" alt="" />
        <p onClick={() => handleLogOut()} className="under-line-text">
          Log out
        </p>
      </div>
      </div>
      </main>
      <NavBar />
    </div>
  )
}

export default Profile
