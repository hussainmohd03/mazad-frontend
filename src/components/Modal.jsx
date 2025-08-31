import { Colors } from 'chart.js'
import React from 'react'

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  auction,
  bidAmount,
  setBidAmount,
  minIncrement,
  setMinIncrement,
  showMinIncrement,
  setShowMinIncrement,
  error,
  placeBid,
  setShowAutoBidInfo,
  timeLeft
}) => {
  return (
    <div
      className="modal"
      onClick={(e) =>
        e.target.classList.contains('modal') && setIsModalOpen(false)
      }
    >
      <div className="modal-content">
        <div className="modal-header">
          <p>Place Bid</p>
          <div className="bidding-time2">
            <img src="/design-images/stopwatch.svg" alt="" />
            {timeLeft.days}d:{timeLeft.hours}h:{timeLeft.minutes}m
          </div>
        </div>
        <div className="modal-auto-bidding">
          <div className="auto-bid-info">
            <p>Use Auto Bid</p>
            <img
              src="/design-images/info.svg"
              alt=""
              className="info-icon"
              onClick={() => setShowAutoBidInfo(true)}
            />
          </div>
          <div className="container">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              onClick={() => setShowMinIncrement((prev) => !prev)}
            />
            <label className="switch" htmlFor="checkbox">
              <span className="slider"></span>
            </label>
          </div>
        </div>
        {showMinIncrement && (
          <label className="auto-bid-labels">You need to set a max bid </label>
        )}
        <div className="modal-bid-amount">
          <button
            className="minus_button"
            onClick={() =>
              setBidAmount(
                bidAmount > (auction?.currentPrice || 0)
                  ? bidAmount - 1
                  : bidAmount
              )
            }
          >
            -
          </button>
          <span>BHD {bidAmount}</span>
          <button
            className="plus_button"
            onClick={() => setBidAmount(bidAmount + 1)}
          >
            +
          </button>
        </div>
        {showMinIncrement && (
          <div className="min-increment-field" style={{ margin: '16px 0' }}>
            <label className="auto-bid-labels">
              You need to set a minimum increment
            </label>
            <div className="modal-bid-amount">
              <button
                className="minus_button"
                onClick={() =>
                  setMinIncrement(minIncrement > 10 ? minIncrement - 1 : 10)
                }
              >
                -
              </button>
              <span>BHD {minIncrement}</span>
              <button
                className="plus_button"
                onClick={() => setMinIncrement(minIncrement + 1)}
              >
                +
              </button>
            </div>
          </div>
        )}
        <button onClick={placeBid} className="sign-button">
          Add Deposit
        </button>
        <div className="terms">
          <p>
            We ensure your information is kept secure. For more information,
            check our <span>Privacy Policy</span> and{' '}
            <span>Terms & Conditions</span>
          </p>
        </div>
        <div className="error">
          <p>{error}</p>
        </div>
      </div>
    </div>
  )
}

export default Modal
