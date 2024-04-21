import { getAuth, signOut } from "firebase/auth";

export const Logout = () => {
  const auth = getAuth();

  signOut(auth);
  return <div></div>;
};
