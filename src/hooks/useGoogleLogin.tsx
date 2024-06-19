import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";

// Login with Google Auth Provider
export const useGoogleLogin = () => {
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      // Login with Google redirect
      await signInWithRedirect(auth, provider);
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
