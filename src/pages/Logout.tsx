import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  // Sign out of Google Firebase Auth and redirect to home
  useEffect(() => {
    signOut(auth);
    navigate("/");
  }, []);

  return <div>Hello Feinds</div>;
};
