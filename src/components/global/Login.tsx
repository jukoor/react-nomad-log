import { Button } from "@mui/material";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";

export const Login = () => {
  const { loginWithGoogle } = useGoogleLogin();

  return (
    <Button variant="contained" color="secondary" onClick={loginWithGoogle}>
      Sign in
    </Button>
  );
};

export default Login;
