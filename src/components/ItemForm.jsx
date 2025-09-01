import React from "react";
import { useState } from "react";
import Category from "./Category";
import Price from "./Price";
import Description from "./Description";
import Images from "./Images";
import { createItem } from "../../services/item";
import { useNavigate } from "react-router-dom";
const ItemForm=()=> {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    endDate: null,
    images: [],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = new FormData();
    itemData.append("name", formData.name);
    itemData.append("category", formData.category);
    itemData.append("price", formData.price);
    itemData.append("endDate", formData.endDate);
    formData.images.forEach((image) => {
      itemData.append("images", image);
    });
    for (let [key, value] of itemData.entries()) {
}
    createItem(itemData);
  };
  return (
    <div className="sell-page">
      {activeStep === 1 && (
        <Category
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
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default ItemForm;
