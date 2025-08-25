import { NavLink } from "react-router-dom";
import categories from "../objects/categories.json";
import auctions from "../objects/auctions.json";
import ItemCard from "../components/ItemCard";
import CategoryCard from "../components/CategoryCard";
import NavBar from "../components/NavBar";
const Home = () => {
  
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
            {auctions.map( auction => (
              <ItemCard
                key={auction._id}
                auction={auction}
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
