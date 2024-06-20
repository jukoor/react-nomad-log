import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { resetSelectedUser, setUserLoggedIn } from "../store/userSlice";

export const Logout = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Sign out of Google Firebase Auth and redirect to home
  useEffect(() => {
    signOut(auth);
    navigate("/");
    dispatch(setUserLoggedIn(false));
    dispatch(resetSelectedUser());
  }, []);

  return <div>Hello Feinds</div>;
};
