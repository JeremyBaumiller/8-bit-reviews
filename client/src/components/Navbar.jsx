import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav>
    <img
      src={
        "/home/jam_master_jerm/Coursework/8-bit-reviews/client/src/assets/8-bit-reviews-high-resolution-logo-white.png"
      }
      alt="My Image"
    />
    <Link to="/">Home</Link>
    <Link to="/games">Games</Link>
    <Link to="/profile">Profile</Link>
    <Link to="/submit-review">Submit Review</Link>
  </nav>
);

export default Navbar;
