import React from "react";

function Price({ setFormData, formData, setActiveStep, activeStep }) {
  return (
    <>
      <div className="item-step-header">
        <img src="/design-images/arrow.svg" alt="" />
        <div>
          <p className="primary-text">What would you like to list?</p>
          <p className="secondary-text">You can select one asset type only </p>
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

export default Price;
