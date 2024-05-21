import { Button } from "@mui/material";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {
  const auth = getAuth();

  const [user] = useAuthState(auth);
  const { loginWithGoogle } = useGoogleLogin();

  return (
    <>
      {user && (
        <Button variant="contained" color="secondary" onClick={loginWithGoogle}>
          Sign in
        </Button>
      )}
    </>
  );
};

export default Login;
