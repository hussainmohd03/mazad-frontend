import React from 'react'
import NavBar from '../components/NavBar'
import UserContext from '../context/UserContext'
import { useContext, useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'
import AreaChartComponent from '../components/AreaChat'
import Notificiation from '../components/Notification'
import ChangePassword from './ChangePassword'

const Profile = ({
  handleLogOut,
  financialData,
  setFinancialData,
  handleDeleteAccount,
  notification,
  setNotification
}) => {
  const { user } = useContext(UserContext)
  const [name, setName] = useState('')

  useEffect(() => {
    user && setName(user.first_name)
  })

  useEffect(() => {
    const getFinancialData = async () => {
      const res = await Client.get(`${BASE_URL}/auth/details`)
      setFinancialData(res.data)
    }
    getFinancialData()
  }, [])

  return (
    <div className="profile-page">
      <header>
        <div className="profile-details">
          <div className="profile-title">Profile</div>
          <div className="profile-user-details">
            <img src="/design-images/default_icon.svg" alt="default_icon" />
            <div className="profile-username">
              <p className="primary-text">{name}</p>
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
                <AreaChartComponent used={financialData.used_percentage} />
              </div>
              <div>
                <p className="tiny-text">Total bidding limit</p>
                <p className="less-tiny-text">
                  BHD {financialData.bidding_limit}
                </p>
                <p className="tiny-text">Remaning</p>
                <p className="less-tiny-text red-text">
                  BHD {financialData.remaining}
                </p>
              </div>
            </div>
          </div>
          <div className="bidding-limit-container-footer">
            <div>
              <p className="bidding-limit-footer-text tiny-text  lighter-grey">
                Deposited amount
              </p>
              <p className="bidding-limit-footer-text deposited-amount less-tiny-text">
                BHD {financialData.deposit}
              </p>
            </div>
            <div className="top-up-div">
              <button className=" bidding-top-up-button bold-button">
                <Link className="no-decor" to="/top-up">
                  Top up +
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="profile-footer">
          <p className="primary-text">Settings</p>
          <div>
            <img src="/design-images/transaction.svg" alt="transaction icon" />
            <p className="change-password-button">
              {' '}
              <Link className="no-decor" to="/transaction-history">
                Transactions{' '}
              </Link>
            </p>
          </div>
          <div>
            <img src="/design-images/password.svg" alt="password" />

            <p className="change-password-button">
              {' '}
              <Link className="no-decor" to="/change-password">
                Change password{' '}
              </Link>
            </p>
          </div>
          <div>
            <img src="/design-images/log_out.svg" alt="log out" />
            <p onClick={() => handleLogOut()} className="under-line-text">
              Log out
            </p>
          </div>
          <div>
            <img src="/design-images/trash.svg" alt="trash icon" />
            <p onClick={() => handleDeleteAccount()} className="no-decor">
              Delete account
            </p>
          </div>
        </div>
      </main>
      <NavBar />
    </div>
  )
}

export default Profile
