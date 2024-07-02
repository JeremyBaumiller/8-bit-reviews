import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS

const UserProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setUsers(result);
      } catch (ex) {
        console.error("Could not load users:", ex);
        setError(ex.message);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div className="container mt-3 bg-dark text-light p-5">
      <h1 className="mt-5">User Profiles</h1>
      {error ? (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      ) : (
        users.map((user) => (
          <div className="media border border-warning p-3 mb-3" key={user.id}>
            <img
              src={user.image_url || "https://via.placeholder.com/60"}
              alt={user.username}
              className="mr-3 mt-3 rounded-circle"
              style={{ width: "60px", height: "60px" }} // Ensure all images are 60x60 pixels
            />
            <div className="media-body">
              <h4>
                {user.username}{" "}
                <small>
                  <i>
                    Joined on {new Date(user.join_date).toLocaleDateString()}
                  </i>
                </small>
              </h4>
              <p>
                <strong>ID:</strong> {user.id}
                <br />
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserProfilePage;
