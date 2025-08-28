import React from "react";

const Description = ({ setFormData, formData, setActiveStep, activeStep }) => {
  const [charsCount, setCharsCount] = React.useState(0);
  const handleChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
    setCharsCount(e.target.value.length);
  };
  return (
    <>
      <div className="item-step-header">
        <img src="/design-images/arrow.svg" alt="" />
        <div>
          <p className="primary-text">What would you like to list?</p>
          <p className="secondary-text">You can select one asset type only </p>
        </div>
      </div>

      <div className="description-field">
        <p>Description</p>
        <textarea onChange={handleChange} maxLength={500} />
        <p>{charsCount} / 500</p>
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

export default Description;
