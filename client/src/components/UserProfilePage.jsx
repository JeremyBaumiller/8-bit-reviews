import React from "react";

const UserProfilePage = () => {
  return (
    <div>
      <h1>User Profile</h1>
    </div>
  );
};

//const register = async(credentials)=> {
//const response = await fetch('/api/auth/register', {
//     method: 'POST',
//     body: JSON.stringify(credentials),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   const json = await response.json();
//   if(response.ok){
//     window.localStorage.setItem('token', json.token);
//     attemptLoginWithToken();
//   }
//   else {
//     throw json;
//   }
// };

export default UserProfilePage;
