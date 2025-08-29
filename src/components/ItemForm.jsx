import React from "react";
import { useState } from "react";
import Category from "./Category";
import Price from "./Price";
import Description from "./Description";
import Images from "./Images";

const ItemForm=({ setActiveButton })=> {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    price: 0,
    endDate: null,
    images: [],
  });
  return (
    <>
      {activeStep === 1 && (
        <Category
          setActiveButton={setActiveButton}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          setFormData={setFormData}
          formData={formData}
        />
      )}
      {activeStep === 2 && (
        <Description
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          setFormData={setFormData}
          formData={formData}
        />
      )}
      {activeStep === 3 && (
        <Images
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          setFormData={setFormData}
          formData={formData}
        />
      )}
      {activeStep === 4 && (
        <Price
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          setFormData={setFormData}
          formData={formData}
        />
      )}
    </>
  );
}

export default ItemForm;
