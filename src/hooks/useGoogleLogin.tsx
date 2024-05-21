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
      // Use signInWithRedirect instead of signInWithPopup
      const result = await signInWithRedirect(auth, provider);
      console.log(result);
      // After successful sign-in, handle the redirect response
      window.addEventListener("load", () => {
        // const result = auth.currentUser;
        console.log(result);
        if (result) {
          const isNewUser = getAdditionalUserInfo(result); // Assuming getAdditionalUserInfo accepts a User object wrapped in a UserCredential-like structure
          console.log(isNewUser);
          if (isNewUser) {
            // console.log("Successfully logged in:", result.displayName);

            // On the first sign up - create a document in firestore to store custom user data
            if (result) {
              console.log(result);
              // addUserDoc(result.uid);
            }
          } else {
            // console.log(
            //   "Successfully logged in (first time):",
            //   result.displayName
            // );
            // Perform actions specific to login
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
