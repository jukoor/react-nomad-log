import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useAppDispatch } from "./reduxHooks";
import { setUserLoggedIn } from "../store/userSlice";
import { setSnackbarOptions, toggleMenuVisibility } from "../store/appSlice";

/* Only used in App.tsx, value check against isLoggedIn @redux store */
export const useCheckAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        dispatch(setUserLoggedIn(true));
        dispatch(
          setSnackbarOptions({
            open: true,
            message: "👋 Welcome back.",
            severity: "success",
          })
        );
      } else {
        setIsAuthenticated(false);
        dispatch(setUserLoggedIn(false));
        // show sidebar when not logged in, to log in
        dispatch(toggleMenuVisibility());
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  return isAuthenticated;
};
