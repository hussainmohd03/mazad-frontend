import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../../services/api'
import { BASE_URL } from '../../globals'

const ChangePassword = () => {
  const navigate = useNavigate()
  const credentialsInitial = {
    old_password: '',
    new_password: '',
    confirm_new_password: ''
  }
  const [credentials, setCredentials] = useState(credentialsInitial)
  const [condition, setCondition] = useState(false)
  const [message, setMessage] = useState('')
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const checkRequirements = () => {
    const symbols = ['@', '%', '&', '#']
    if (credentials.old_password !== credentials.new_password) {
      for (let i = 0; i < credentials.new_password.length; i++) {
        if (credentials.new_password[i] in symbols) {
          if (
            credentials.new_password === credentials.confirm_new_password &&
            credentials.confirm_new_password.length > 8
          ) {
            return setCondition(true)
          }
        }
      }
    }
    return setMessage('One of the conditions has not been met')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (condition) {
      await Client.put(`${BASE_URL}/users/me/password`, {
        old_password: credentials.old_password,
        new_password: credentials.new_password
      })
      navigate('/profile')
    }
  }

  return (
    <>
      <div className="change-password-page">
        <div className="change-pass-header-container">
          <img
            onClick={() => navigate(-1)}
            src="/design-images/back-arrow-with-circle.svg"
            alt="back"
          />
            <div className="change-pass-header">Change password</div>          
        </div>
        <div>
          <p className="less-tiny-header">About change password policies </p>
          <div className="tiny-header-words">
            Change password requests are only applicable once all three cases
            are met, please make sure you meet all of the below
          </div>
          <div>
            <ul>
              <li className="tiny-header-words bottom-indentation">
                Your new password must include one of these special characters
                (‘#’, ‘%’, ‘@’, ‘&’).
              </li>
              <li className="tiny-header-words bottom-indentation">
                Your new password must not be the same as your old, you will not
                be informed if it is.
              </li>
              <li className="tiny-header-words">
                Your new password must have at least one upper case letter,
                lower case letter, and number & must not be shorter than 8
                characters in total.
              </li>
            </ul>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="less-tiny-header" htmlFor="old_password">
            Your old password
          </label>
          <br />
          <input
            type="password"
            name="old_password"
            placeholder="Enter your old password (required)"
            onChange={handleChange}
            value={credentials.old_password}
            className="input-field side-indentation change-pass field-bottom-indentation"
          />
          <br />
          <label className="less-tiny-header" htmlFor="new_password">
            Your new password
          </label>
          <br />

          <input
            type="password"
            name="new_password"
            placeholder="Enter your new password (required)"
            onChange={handleChange}
            value={credentials.new_password}
            className="input-field side-indentation change-pass field-bottom-indentation"
          />
          <br />
          <label className="less-tiny-header" htmlFor="confirm_new_password">
            Confirm your new password
          </label>
          <br />
          <input
            type="password"
            name="confirm_new_password"
            placeholder="Confirm your new password (required)"
            onChange={handleChange}
            value={credentials.confirm_new_password}
            className="input-field side-indentation change-pass field-bottom-indentation"
          />
          <p className="less-tiny-text side-indentation top-padding">
            {message}
          </p>
          <button type="submit" className="change-password-submit">
            Change my password
          </button>
        </form>
      </div>
    </>
  )
}

export default ChangePassword
