import React from 'react'
import { useNavigate } from 'react-router-dom'
const Description = ({ setFormData, formData, setActiveStep, activeStep }) => {
  const [charsCount, setCharsCount] = React.useState(0)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (e.target.name === 'description') {
      setCharsCount(e.target.value.length)
    }
  }
  return (
    <>
      <div className="item-step-header">
        <img
          src="/design-images/arrow.svg"
          alt="arrow"
          onClick={() => navigate(-1)}
        />
        <div>
          <p className="primary-text">What would you like to list?</p>
          <p className="secondary-text">You can select one asset type only </p>
        </div>
      </div>

      <div className="description-field">
        <p>Name</p>
        <input
          type="text"
          required
          value={formData.name}
          name="name"
          className="name-field"
          onChange={handleChange}
        />
        <p>Description</p>
        <textarea
          onChange={handleChange}
          required
          maxLength={500}
          name="description"
        />
        <p>{charsCount} / 500</p>
      </div>
      <div className="item-step-footer">
        <button
          className="action-button"
          onClick={() => {
            setActiveStep(activeStep + 1), console.log(formData)
          }}
          disabled={charsCount === 0}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default Description
