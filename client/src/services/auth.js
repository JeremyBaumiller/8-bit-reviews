import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

//this needs redone using tokens instead of context and use auth check class repo for additonal help
