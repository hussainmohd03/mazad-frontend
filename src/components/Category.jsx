import React from "react";
import categories from "../objects/categories.json";
import { useState } from "react";
const Category = ({
  setFormData,
  formData,
  setActiveStep,
  activeStep,
  setActiveButton,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleClick = (e) => {
    setSelectedCategory(e.target.id);
    console.log(selectedCategory);
    setFormData({ ...formData, category: e.target.id });
  };

  return (
    <>
      <div className="item-step-header">
        <img
          src="/design-images/arrow.svg"
          alt=""
          onClick={() => setActiveButton("on-auction")}
        />
        <div>
          <p className="primary-text">What would you like to list?</p>
          <p className="secondary-text">You can select one asset type only </p>
        </div>
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <div
            id={category.name}
            key={category.name}
            className={`category-item${
              selectedCategory === category.name ? " active" : ""
            }`}
            onClick={handleClick}
          >
            <img
              src={`/design-images/categories/${category.image}`}
              alt={category.name}
            />
            <p className="primary-text">{category.name}</p>
          </div>
        ))}
      </div>
      <div className="item-step-footer">
        <button
          className="action-button"
          onClick={() => {
            setActiveStep(activeStep + 1), console.log(formData);
          }}
          disabled={!selectedCategory}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Category;
