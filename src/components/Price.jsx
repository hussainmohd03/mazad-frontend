import React from "react";

const Price = ({ setFormData, formData, setActiveStep, activeStep }) => {
  return (
    <>
      <div className="item-step-header">
        <img src="/design-images/arrow.svg" alt="" />
        <div>
          <p className="primary-text">Set your price</p>
        </div>
      </div>
      <div className="price-step-body">
        <div className="info-box">
          <img src="design-images/info-icon.svg" alt="" />
          <div>
            please insure all you information is accurate and complete, as no
            edits can be made after this stage
          </div>
        </div>
      </div>
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
};

export default Price;
