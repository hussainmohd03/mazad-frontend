import React from 'react'
import { NavLink } from 'react-router-dom'

const CategoryCard = ({ category }) => {
  return (
    <NavLink
      className="category-link"
      key={category.name}
      to={`/category/${category.name}`}
    >
      <img
        src={`design-images/categories/${category.image}`}
        alt="item-picture"
      />
      <p>{category.name}</p>
    </NavLink>
  )
}

export default CategoryCard
