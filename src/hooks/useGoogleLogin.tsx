import { useAppDispatch } from "./reduxHooks";
import { setUserLoggedIn } from "../store/userSlice";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";

// Login with Google Auth Provider, dispatch is logged in to redux store
export const useGoogleLogin = () => {
  const dispatch = useAppDispatch();

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const isNewUser = getAdditionalUserInfo(result);

      if (isNewUser) {
        console.log("Successfully loggid in:", user.displayName);
        // Perform actions specific to first-time sign-up
      } else {
        console.log("Successfully loggid in (first time):", user.displayName);
        // Perform actions specific to login
      }

      dispatch(setUserLoggedIn(true));
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error logging in:", error.message);
      } else {
        console.error("An unhandled error occurred:", error);
      }
    }
  };

  return { loginWithGoogle };
};
