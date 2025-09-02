import Client from '../../services/api'
import { useNavigate } from 'react-router-dom'
const Verification = ({ verification, setVerification }) => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('in handle submit')
    const response = await Client.put(`/users/me`, { verified: true })
    console.log('submitted response', response)
    setVerification(true)
    navigate('/sell')
  }

  return (
    <>
      <div className="verification-page">
        <div className="change-pass-header-container">
          <img
            onClick={() => navigate(-1)}
            src="/design-images/back-arrow-with-circle.svg"
            alt="back"
          />
          <div className="change-pass-header">Upload your documents</div>
        </div>
        
        <form action="" encType="multipart/form-data" onSubmit={handleSubmit}>
          <p className="less-tiny-header">
            <label htmlFor="iban-certificate">IBAN Certificate</label>
          </p>

          <input type="file" className="input-field side-indentation" required/>
          <div className="button-sell-val-page">
            {' '}
            <button className="grey-back-button" onClick={() => navigate(-1)}>
              Back
            </button>
            <button className="red-forward-button" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Verification
