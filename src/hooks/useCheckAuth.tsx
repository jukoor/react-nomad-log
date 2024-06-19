import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useAppDispatch } from "./reduxHooks";
import { setUserLoggedIn } from "../store/userSlice";
import { setSnackbarOptions, toggleMenuVisibility } from "../store/appSlice";
import { useCheckIfFirebaseUserExists } from "./useCheckIfFirebaseUserExists";
import { useAddFirebaseUser } from "./useAddFirebaseUser";

/* Used once on app init, check if user is authenticated */
/* On fist time signing in, create a firebase doc with the same uid as identifier */
export const useCheckAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const { addUserDoc } = useAddFirebaseUser();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const checkIfFirebaseUserExists = useCheckIfFirebaseUserExists(
          user.uid
        );

        if (checkIfFirebaseUserExists) {
          checkIfFirebaseUserExists().then((exists) => {
            if (!exists) {
              // User does not exist, perform actions for new users

              // add empty firebase user with same uid as google auth user
              addUserDoc(user.uid);
            } else {
              // User exists, perform actions for returning users
            }
          });
        }

        setIsAuthenticated(true);
        dispatch(setUserLoggedIn(true));
        dispatch(
          setSnackbarOptions({
            open: true,
            message: `Welcome back ${user.displayName} 👋`,
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
