import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";

export const Logout = () => {
  const { logoutUser } = useContext(AuthContext);

  // Sign out of Google Firebase Auth and redirect to home
  useEffect(() => {
    logoutUser();
  }, []);

  return <></>;
};
