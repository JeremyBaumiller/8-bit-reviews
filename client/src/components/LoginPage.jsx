import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function LoginPage({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    // validate credentials here
    handleLogin();
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-10 bg-dark text-white">
      <div className="card bg-dark text-white p-14">
        <img
          src="covers/logo-3.png"
          className="card-img-top"
          alt="Header"
          style={{ width: "300px", height: "auto" }}
        />
        <h2 className="text-center mt-3">Login</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-30">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-white">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
