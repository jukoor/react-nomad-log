import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { Button } from "@mui/material";

export const Login = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const isNewUser = getAdditionalUserInfo(result);
      console.log(isNewUser);
      if (isNewUser) {
        console.log("Erfolgreich angemeldet:", user.displayName);
        // Perform actions specific to first-time sign-up
      } else {
        console.log("Erfolgreich angemeldet:", user.displayName);
        // Perform actions specific to login
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Anmeldefehler:", error.message);
      } else {
        console.error("An unhandled error occurred:", error);
      }
    }
  };

  return <Button onClick={handleLogin}>Mit Google anmelden</Button>;
};

export default Login;
