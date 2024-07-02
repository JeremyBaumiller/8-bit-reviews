import React, { useEffect, useState } from "react";

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
        setUsers(result);
      } catch (ex) {
        console.error("Could not load users:", ex);
        setError(ex.message);
      }
      fetchAllUsers();
    };
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        users.map((user) => (
          <div key={user.id}>
            <h1>{user.username}</h1>
          </div>
        ))
      )}
    </div>
  );
};

export default UserProfilePage;
