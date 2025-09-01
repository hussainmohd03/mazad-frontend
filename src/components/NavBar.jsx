import React from "react";
import { NavLink } from "react-router-dom";


const NavBar = ({ inSell, setInSell }) => {
  return (
    <nav>
      <NavLink
        to="/home"

        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }

      >
        <img src="/design-images/nav-home.svg" alt="home" />
      </NavLink>

      <NavLink
        to="/activity"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <img src="/design-images/nav-activity.svg" alt="activity" />
      </NavLink>

        {!inSell ? (
          <NavLink
            to="/sell"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <img src="/design-images/nav-sell.svg" alt="sell" />
          </NavLink>
        ) : (
          <NavLink
            to="/item-form"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <img src="/design-images/item-form-nav.svg" alt="sell" />
          </NavLink>
        )}


      <NavLink
        to="/watchlist"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <img src="/design-images/nav-watchlist.svg" alt="watchlist" />
      </NavLink>
      <NavLink
        to="/profile"

        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <img src="/design-images/nav-profile.svg" alt="profile" />
      </NavLink>
    </nav>
  )
}

export default NavBar
