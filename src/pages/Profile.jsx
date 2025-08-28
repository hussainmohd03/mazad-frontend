import React from 'react'
import NavBar from '../components/NavBar'
import UserContext from '../context/UserContext'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'
import AreaChartComponent from '../components/AreaChat'

const Profile = ({ handleLogOut, financialData, setFinancialData }) => {
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
    <div>
      <div className="profile-headline-container">
        <p className="profile-header">Profile</p>
      </div>
      <div className="profile-details-container">
        <img src="/design-images/default_icon.svg" alt="" />
        <div className="name-and-profile">
          <p className="ur-name">{name}</p>
          <Link to={'/edit-profile'} className="edit-profile-button">
            Edit profile
          </Link>
        </div>
      </div>
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

      <p className="settings-header">Settings</p>
      <div className="change-password-container">
        <img
          className="password-icon"
          src="/design-images/password.svg"
          alt=""
        />

        <p className="change-password-button">
          {' '}
          <Link className="no-decor" to="/change-password">
            Change password{' '}
          </Link>
        </p>
      </div>
      <div className="log-out-container">
        <img className="log-out-icon" src="/design-images/log_out.svg" alt="" />
        <p onClick={() => handleLogOut()} className="log-out-button">
          Log out
        </p>
      </div>
      <NavBar />
    </div>
  )
}

export default Profile
