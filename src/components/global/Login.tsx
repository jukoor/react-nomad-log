import { Button } from "@mui/material";
import { useGoogleLogin } from "../../hooks/useGoogleLogin";

export const Login = () => {
  const { loginWithGoogle } = useGoogleLogin();

  return <Button onClick={loginWithGoogle}>Sign in with Google</Button>;
};

export default Login;
