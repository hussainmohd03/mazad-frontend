import React from "react";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <div className="landing-page-buttons">
        <img src="design-images\Vector.png" alt="vector" />
        <h2>Get the Best Auction Experience</h2>
        <button
          className="get-started-btn"
          onClick={() => navigate("/sign-in")}
        >
          Get Started
        </button>
        <button className="guest-btn">Browse as Guest</button>
      </div>
    </div>
  );
};

export default Landing;
