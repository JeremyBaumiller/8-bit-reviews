import React from "react";

const HomePage = ({ handleLogout }) => {
  return (
    <div className="bg-dark text-light py-5">
      <div className="container">
        <h1 className="display-4">Welcome to 8-Bit-Reviews</h1>
        <p className="lead"></p>
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
