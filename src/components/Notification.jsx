import { useEffect } from 'react'

const Notificiation = ({ notification, setNotification }) => {
  useEffect(() => {
    console.log('notifi', notification)

    setTimeout(() => {
      setNotification('')
    }, 2000)
  }, [])
  return (
    <>
      {notification && (
        <div className="notif-container">
          <div className="notif-upper-label">
            <img
              width="30px"
              className="notif-logo"
              src="/design-images/mazad_logo.png"
              alt=""
            />
            <p className="notif-secondary-text title">MAZAD</p>

            <span>
              <p className="notif-secondary-text time">Just now</p>
            </span>
          </div>
          <p className="notif-main-text">{notification}</p>
        </div>
      )}
    </>
  )
}

export default Notificiation
