import { useAppDispatch } from "./reduxHooks";
import { setUserLoggedIn } from "../store/userSlice";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
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

    try {
      // Login with Google redirect
      const result = await signInWithRedirect(auth, provider);
      console.log(result);
      // After successful sign-in, handle the redirect response
      window.addEventListener("load", () => {
        if (result) {
          const isNewUser = getAdditionalUserInfo(result);
          console.log(isNewUser);
          if (isNewUser) {
            // On the first sign up - create a document in firestore to store custom user data
            if (result) {
              console.log(result);
              // Todo
              // addUserDoc(result.uid);
            }
          } else {
            // console.log(
            //   "Successfully logged in (first time):",
            //   result.displayName
            // );
          }

          dispatch(setUserLoggedIn(true));
        }
      });
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
