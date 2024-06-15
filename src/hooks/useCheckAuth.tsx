import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useAppDispatch } from "./reduxHooks";
import { setUserLoggedIn } from "../store/userSlice";

export const useCheckAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        dispatch(setUserLoggedIn(true));
      } else {
        setIsAuthenticated(false);
        dispatch(setUserLoggedIn(false));
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return isAuthenticated;
};
