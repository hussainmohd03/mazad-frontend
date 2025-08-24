import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  const [current, setCurrent] = useState(null);

  const handleClick = (e) => {
    setCurrent(e.target.name);
  };

  return (
    <nav>
      <NavLink
        to="/home"
        onClick={handleClick}
        className={current === "home" ? "current-page" : "nav-page"}
      >
        <img src="/design-images/nav-home.png" alt="home" name="home" />
      </NavLink>
      <NavLink
        to="/activity"
        onClick={handleClick}
        className={current === "activity" ? "current-page" : "nav-page"}
      >
        <img
          src="/design-images/nav-activity.png"
          alt="activity"
          name="activity"
        />
      </NavLink>
      <NavLink
        to="/sell"
        onClick={handleClick}
        className={current === "sell" ? "current-page" : "nav-page"}
      >
        <img src="/design-images/nav-sell.png" alt="sell" name="sell" />
      </NavLink>
      <NavLink
        to="/watchlist"
        onClick={handleClick}
        className={current === "watchlist" ? "current-page" : "nav-page"}
      >
        <img
          src="/design-images/nav-watchlist.png"
          alt="watchlist"
          name="watchlist"
        />
      </NavLink>
      <NavLink
        to="/profile"
        onClick={handleClick}
        className={current === "profile" ? "current-page" : "nav-page"}
      >
        <img
          src="/design-images/nav-profile.png"
          alt="profile"
          name="profile"
        />
      </NavLink>
    </nav>
  );
};

export default NavBar;
