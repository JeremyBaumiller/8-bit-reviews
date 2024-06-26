import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <img src="covers/logo.png" className="logo" alt="" />
    <Link to="/">Home</Link>
    <Link to="/games">Games</Link>
    <Link to="/profile">Profile</Link>
    <Link to="/submit-review">Submit Review</Link>
  </nav>
);

export default Navbar;
