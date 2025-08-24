import React from "react";
import { NavLink } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="sign-page">
      <form className="sign-form">
        <h2>Sign up</h2>
        <label htmlFor="email">Email address</label>
        <input
          type="email"
          placeholder="Enter your email address (required)"
          name="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password (required)"
          required
        />
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-enter your password (required)"
          required
        />
        <button type="submit" className="sign-button">
          Sign up
        </button>
        <div className="terms">
          <img src="design-images\lock.png" alt="lock-img" />
          <p>
            By continuing you agree to Mazad’s{" "}
            <a href="">Terms and conditions</a> and{" "}
            <a href="">Privacy Policy</a>
          </p>
        </div>
        <img src="design-images\or.png" alt="or" />
        <button className="google-btn">
          <img src="design-images\google.png" alt="" />
          Sign up with Google
        </button>
        <p className="sign-alternative">
          Already have an account? <NavLink to="/sign-in">SIGN IN</NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
