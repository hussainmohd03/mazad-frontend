const AutoBiddingInfo = ({ setShowAutoBidInfo }) => {
  return (
    <div
      className="modal2"
      onClick={(e) => {
        if (e.target.classList.contains('modal2')) {
          setShowAutoBidInfo(false)
        }
      }}
    >
      <div className="modal-content2">
        <div className="modal_header2">
        <button onClick={() => setShowAutoBidInfo(false)}>x</button>
        <p>Auto Bid</p>
        </div>
        <div>
          {/* <img src="/design-images/auction-hammer.svg" alt="Auto Bid" /> */}
        </div>
        <h2>First time auto bidding?</h2>
        <p className="auto-bid-text">
          Bids will be placed on your behalf by the minimum increment, allowing
          you to always remain the highest bidder up to your bid limit.
        </p>
        <button
          className="sign-button"
          onClick={() => setShowAutoBidInfo(false)}
        >
          Ok
        </button>
      </div>
    </div>
  )
}

export default AutoBiddingInfo
