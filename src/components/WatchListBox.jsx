import { useEffect, useState } from 'react'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'

const WatchListBox = ({ auction }) => {
  const [isInWatchList, setIsInWatchList] = useState(true)

  useEffect(() => {
    const fetchWatchList = async () => {
      const response = await Client.get('/watchlist/me')
      setIsInWatchList(
        response.data.some((item) => item.auctionId === auction._id)
      )
    }
    fetchWatchList()
  }, [])

  return (
    <div className="watchlist-box">
      <div className="watchlist-box-header">
        <img
          src={`${BASE_URL}/${auction.itemDetails.images[0]}`}
          alt=""
          className="watch-list-image"
        />
        <div className="watchlist-item-name">
          <p className="primary-text">{auction.itemDetails.name}</p>
          <p className="secondary-text">{auction.itemDetails.category}</p>
        </div>
        <div className="watchlist-action-box">
          <button
            onClick={async () => {
              await Client.put(`/watchlist/me/remove/${auction.auctionId._id}`)
              setIsInWatchList(false)
              window.location.reload()
            }}
          >
            <img
              src={`/design-images/book-mark.svg`}
              alt="remove"
              className={'active-bookmark'}
            />
          </button>
          <button>
            <img src={'/design-images/bids-count.svg'} alt="bids" />
          </button>
        </div>
      </div>
      <div className="watchlist-box-footer">
        <p>
          <span className="currency">BHD&nbsp;</span>
          {auction.itemDetails.price.toLocaleString()}
        </p>
        <p>
          <img src={`design-images/bids-count.svg`} alt="total-bids" />{' '}
          <span>&nbsp;{auction.totalBids}</span>
        </p>
        <p>
          <img src={`design-images/bids-time.svg`} alt="time-left" />
          <span>&nbsp;{auction.auctionId.endDate.split('T')[0]}</span>
        </p>
      </div>
    </div>
  )
}

export default WatchListBox
