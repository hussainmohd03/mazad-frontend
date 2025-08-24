import { NavLink } from "react-router-dom";
import categories from "../objects/categories.json";
import items from "../objects/items.json";
import { useState } from "react";
import ItemDetails from "../components/ItemDetails";
import ItemCard from "../components/ItemCard";
import CategoryCard from "../components/CategoryCard";
import NavBar from "../components/NavBar";
const Home = () => {
  const [selectItem, setSelectedItem] = useState(null);

  const showSelectedItem = (item) => {
    setSelectedItem(item);
  };
  if (selectItem)
    return <ItemDetails item={selectItem} setSelectedItem={setSelectedItem} />;
  return (
    <>
      <div className="home-page">
        <div className="home-header">
          <input
            type="text"
            name="search"
            className="search-bar"
            placeholder="What are you looking for?"
          />
          <NavLink to="">
            <img src="design-images/cart.png" alt="cart" />
          </NavLink>
        </div>
        <div className="home-body">
          <div className="home-categories">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
          <div className="items-container">
            {items.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                showSelectedItem={showSelectedItem}
              />
            ))}
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
};

export default Home;
