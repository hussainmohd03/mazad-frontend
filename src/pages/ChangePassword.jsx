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

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await Client.put(`${BASE_URL}/users/me/password`, {
      old_password: credentials.old_password,
      new_password: credentials.new_password
    })
    navigate('/account')
  }

  return (
    <>
      <div>
        <div className="profile-headline-container">
          <p className="change-pass-header">Change password</p>
        </div>
        <p className="less-tiny-header">About change password policies </p>
        <div className="tiny-header-words">
          Change password requests are only applicable once all three cases are
          met, please make sure you meet all of the below
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
              Your new password must have at least one upper case letter, lower
              case letter, and number & must not be shorter than 8 characters in
              total.
            </li>
          </ul>
        </div>
        <form onSubmit={handleSubmit}></form>

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
      </div>
      <button type="submit" className="change-password-submit">
        Change my password
      </button>
    </>
  )
}

//   confirm_new_password: ''
export default ChangePassword
