import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// Instantiate the auth service SDK
const auth = getAuth();

// Handle user sign up with google
export const handleGoogleSignUp = async () => {
  // Instantiate a GoogleAuthProvider object
  const provider = new GoogleAuthProvider();

  try {
    // Sign in with a pop-up window
    const result = await signInWithPopup(auth, provider);

    // Pull signed-in user credential.
    const user = result.user;
    console.log(user);
  } catch (err) {
    // Handle errors here.
  }
};
