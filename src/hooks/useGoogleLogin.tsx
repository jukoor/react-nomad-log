import { useAppDispatch } from "./reduxHooks";
import { setUserLoggedIn } from "../store/userSlice";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useAddFirebaseUser } from "./useAddFirebaseUser";

// Login with Google Auth Provider, dispatch is logged in to redux store
// If first Login/Signup - create a user document in firestore db to store additional user info
export const useGoogleLogin = () => {
  const dispatch = useAppDispatch();
  const { addUserDoc } = useAddFirebaseUser();

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    console.log("ok");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const isNewUser = getAdditionalUserInfo(result);

      if (isNewUser) {
        console.log("Successfully logged in:", user.displayName);

        // On the fist sign up - create a document in firestore to store custom user data
        if (user) {
          console.log(user);
          addUserDoc(user.uid);
        }
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
