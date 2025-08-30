import React from "react";

const Price = ({ setFormData, formData, setActiveStep, activeStep }) => {
  return (
    <>
      <div className="item-step-header">
        <img src="/design-images/arrow.svg" alt="" onClick={() => setActiveStep(activeStep-1)}/>
        <div>
          <p className="primary-text">Set your price</p>
          <p className="secondary-text">Price can't be 0 or less and cannot be changed after</p>
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
        <div className="price-box">
          <div>
            <p className="primary-text">On Auction</p>
            <p className="secondary-text">Sell your asset to the highest bidder within a set time frame</p>
          </div>
          <div className="price-box-body">
            <p className="primary-text">Set your reserve amount</p>
            <div className="price-input-box">
              <button onClick={()=>{setFormData({price : formData.price - 10})}} className="">-</button>
              <input 
                type="number"
                className="price-input"
                placeholder="0"
                min={1}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
            />
              <button onClick={()=>{setFormData({price : formData.price + 10})}}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div className="item-step-footer">
        <button
          className="action-button"
          onClick={() => setActiveStep(activeStep + 1)}
          disabled={formData.price < 1}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Price;
