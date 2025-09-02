import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Images = ({ setFormData, formData, setActiveStep, activeStep }) => {
  const [preview, setPreview] = useState([])
  const navigate = useNavigate()
  const handleFileChange = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      setPreview((prev) => [...prev, URL.createObjectURL(file)])
      setFormData({ ...formData, images: [...formData.images, file] })
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
          <p className="primary-text">Upload your images and videos</p>
          <p className="secondary-text">
            Upload high quality images to make your assets stand out.
          </p>
        </div>
      </div>
      <div className="images-step-body">
        <div className="info-box">
          <img src="design-images/info-icon.svg" alt="info icon" />
          <div>please upload only 4 images to proceed</div>
        </div>
        <label htmlFor="image-upload" className="image-upload-label">
          +
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="preview-container">
          {preview.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index}`}
              className="preview-image"
            />
          ))}
        </div>
      </div>
      <div className="item-step-footer">
        <button
          className="action-button"
          onClick={() => setActiveStep(activeStep + 1)}
          disabled={formData.images.length !== 4}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default Images
