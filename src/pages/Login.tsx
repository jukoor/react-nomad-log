import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { useGoogleLogin } from "../hooks/useGoogleLogin";

export const Login = () => {
  const { loginWithGoogle } = useGoogleLogin();

  const userData = useAppSelector((state) => state.User);
  const navigate = useNavigate();

  // Sign in with Google Auth
  useEffect(() => {
    if (!userData.isLoggedIn) {
      loginWithGoogle();
    } else {
      // if logged in, navigate to home/map
      navigate("/");
    }
  }, []);

  return <></>;
};
