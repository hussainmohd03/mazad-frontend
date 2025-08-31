import { useState, useContext } from 'react'
import { BASE_URL } from '../../globals'
import Client from '../../services/api'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
const TopUp = ({ financialData, setFinancialData }) => {
  const [amount, setAmount] = useState(100)
  const { user } = useContext(UserContext)

  const navigate = useNavigate()

  let total = 0
  const handleDecrement = () => {
    if (amount > 0) {
      total = amount - 10
      setAmount(total)
    }
  }

  const handleIncrement = () => {
    total = amount + 10
    setAmount(total)
  }

  const handleClick = async () => {
    const res = await Client.put(`${BASE_URL}/users/me`, {
      balance: financialData.deposit - financialData.bidding_limit + amount
    })
    navigate('/profile')
  }

  return (
    <>
      <div className="item-page">
        <div className="item-page-header" onClick={() => navigate(-1)}>
          <img src="/design-images/arrow.svg" alt="back" />
        </div>
        <p>Top up</p>
        <p>Select the amount you would like to deposit into your account</p>
        <button onClick={handleDecrement}>-</button>
        <p>BHD {amount}</p>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleClick}>Top up</button>
        <p>
          We ensure your information is kept secure. For more information, check
          our Privacy Policy and Terms & Conditions
        </p>
      </div>
    </>
  )
}

export default TopUp
