import React from "react";

function Images({ setFormData, formData, setActiveStep, activeStep }) {
  return (
    <>
      <div className="item-step-header">
        <img src="/design-images/arrow.svg" alt="" />
        <div>
          <p className="primary-text">Upload your images and videos</p>
          <p className="secondary-text"> </p>
        </div>
      </div>
      <div className="category-grid"></div>
      <div className="item-step-footer">
        <button
          className="action-button"
          onClick={() => setActiveStep(activeStep + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Images;
