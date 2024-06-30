import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    // No need to prevent default behavior for Link component
    // setSearchQuery(""); // Optionally clear search query input
  };

  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top"
      style={{
        height: "60px", //height
      }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src="covers/logo.png"
            className="logo"
            alt="Logo"
            width="120"
            height="80"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/games">
                Games
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/submit-review">
                Submit Review
              </Link>
            </li>
            <li className="nav-item">
              <form className="d-flex" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search Game"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                <Link
                  to={`/games/${searchQuery}`}
                  className="btn btn-outline-light"
                >
                  Search
                </Link>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
