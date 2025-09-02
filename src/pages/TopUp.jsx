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

  const handleIncrement = () => {
    setAmount(amount + 10)
  }

  const handleClick = async () => {
    const res = await Client.put(`${BASE_URL}/users/me`, {
      balance: (financialData.deposit - financialData.bidding_limit)+ amount
    })
    navigate('/profile')
  }

  return (
    <>
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
            <p>Top Up</p>
            </div>
            <p className='modal-sentence'>Select the amount you would like to deposit into your account</p>
            <div className="modal-bid-amount topup-modal">
              <div className="price-input-box">
              <button onClick={()=>setAmount(amount-10)} className=""><img src="design-images/minus.svg" alt="" /></button>
              <input 
                type="number"
                className="price-input"
                placeholder="0"
                min={1}
                value={amount}
                onChange={(e)=>setAmount(e.target.value)} 
            />
              <button onClick={handleIncrement}><img src="design-images/plus.svg" alt="" /></button>
            </div>
            <button className="sign-button" onClick={handleClick}>
              Top up
            </button>
            </div>
            <div className="terms">
              <p>
                We ensure your information is kept secure. For more information,
                check our <span>Privacy Policy</span> and{' '}
                <span>Terms & Conditions</span>
              </p>
            </div>
              <div className='white-space'></div>
          </div>
        </div>
    </>
  )
}
export default TopUp
