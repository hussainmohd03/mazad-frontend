import React from 'react'
import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import AuctionBox from '../components/AuctionBox'
import { getSellerItems } from '../../services/item'
import EmptyPage from '../components/EmptyPage'
import SellerItemBox from '../components/SellerItemBox'
// import auctions from "../objects/auctions.json";
import Client from '../../services/api'
import { BASE_URL } from '../../globals'
import Verification from './Verification'
import { useNavigate } from 'react-router-dom'
const Sell = () => {
  const navigate = useNavigate()
  const [activeButton, setActiveButton] = useState('on-auction')
  const [sellerItems, setSellerItems] = useState([])
  const [sellerAuctions, setSellerAuctions] = useState([])
  const [inSell, setInSell] = useState(false)
  const [verification, setVerification] = useState(false)
  const getAllItems = async () => {
    const items = await getSellerItems()
    setSellerItems(items.items)
  }

  useEffect(() => {
    const checkValidation = async () => {
      const response = await Client.get(`/users/me`)
      setVerification(response.data.user.verified)
    }
    if (verification) {
      const fetchSellerItems = async () => {
        try {
          const items = await getSellerItems()
          setSellerItems(items.items)
        } catch (error) {
          console.error('Failed to fetch seller items:', error)
        }
      }
      const getSellerAuctions = async () => {
        console.log('getting seller auctions')
        const auctions = await Client.get(`${BASE_URL}/auctions/me`)
        setSellerAuctions(auctions.data.items)
      }

      getSellerAuctions()
      fetchSellerItems()
      setInSell(true)
    }
    console.log('enetered use effect in sell')
    checkValidation()
  }, [])

  return (!verification) ? (
                <div className="sell-with-us-container">
            <div className="banner">
              {/* <img src="https://www.bizbahrain.com/wp-content/uploads/2023/08/English-Image-1024x1024.png" alt="" /> */}
            </div>
            <div className="ctn-action">
              <button className="action-button sell-btn">Sell With Us</button>
            </div>

            <h3>
              Why sell on <span id="mazad-title">Mazad?</span>
            </h3>
            <div className="feature">
              <img src="/design-images/check-mark.svg" alt="" />
              <div>
                <h3>Low Fees</h3>
                <p>
                  Competitive and transparent fees to maximize your earnings.{' '}
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/design-images/check-mark.svg" alt="" />
              <div>
                <h3>Low Fees</h3>
                <p>
                  Competitive and transparent fees to maximize your earnings.{' '}
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/design-images/check-mark.svg" alt="" />
              <div>
                <h3>Low Fees</h3>
                <p>
                  Competitive and transparent fees to maximize your earnings.{' '}
                </p>
              </div>
            </div>
          </div>
    ):(
          <div className="sell-page">
      <header>
        <p className="activity-header">Sell</p>
        <div className="toggle-buttons">
          <button
            className={activeButton === 'on-auction' ? 'active' : ''}
            onClick={() => setActiveButton('on-auction')}
          >
            On Auction
          </button>
          <button
            className={activeButton === 'for-sale' ? 'active' : ''}
            onClick={() => {
              setActiveButton('for-sale')
            }}
          >
            For Sale
          </button>
        </div>
      </header>
        <main>
          <div className="auctions-grid">
            {activeButton === 'for-sale' ? (
              sellerItems.length > 0 ? (
                sellerItems.map((item) => (
                  <SellerItemBox key={item._id} auction={item} />
                ))
              ) : (
                <EmptyPage image={'design-images/no-assets-listed.svg'} />
              )
            ) : sellerAuctions.length > 0 ? (
              sellerAuctions.map((auction) => (
                <AuctionBox key={auction._id} auction={auction} />
              ))
            ) : (
              <EmptyPage image={'design-images/no-assets-listed.svg'} />
            )}
          </div>
      </main>
      <NavBar inSell={inSell} setInSell={setInSell} />
    </div>
    )}

export default Sell
