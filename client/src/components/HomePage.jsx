import React from "react";

const HomePage = ({ handleLogout }) => {
  return (
    <div>
      <h2>Welcome to 8-Bit-Reviews</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default HomePage;
