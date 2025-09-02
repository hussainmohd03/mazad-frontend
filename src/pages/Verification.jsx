import Client from '../../services/api'
import { useNavigate } from 'react-router-dom'
const Verification = () => {
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await Client.put(`/users/me`, { verified: true })
    console.log(response)
  }
  return (
    <>
      <p>Upload your documents</p>
      {/* <p>IBAN Certificate </p> */}
      <form action="" enctype="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="iban-certificate">IBAN Certificate</label>
        <input type="file" />
        <button onClick={() => navigate(-1)}>Back</button>
        <button type="submit">Register</button>
      </form>
    </>
  )
}

export default Verification
