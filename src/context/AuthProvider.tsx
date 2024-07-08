import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../services/firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { useAppDispatch } from "../hooks/reduxHooks";
import { resetSelectedUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useAddFirebaseUser } from "../hooks/useAddFirebaseUser";
import { setSnackbarOptions } from "../store/appSlice";

type AuthProviderProps = {
  children: ReactNode;
};

interface IAuthProviderContextProps {
  user: User | null;
  loginUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
  createUserAccount: () => void;
}

const initialValues: IAuthProviderContextProps = {
  user: null,
  loginUser: async () => {},
  logoutUser: async () => {},
  loading: false,
  isAuthenticated: false,
  createUserAccount: () => {},
};

// Initialize Cloud Firestore and get a reference to the service
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export const AuthContext =
  createContext<IAuthProviderContextProps>(initialValues);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useAppDispatch();
  const { addUserDoc } = useAddFirebaseUser();
  const navigate = useNavigate();

  /* Login user to firebase with email and password methode */
  const loginUser = async () => {
    signInWithEmailAndPassword(auth, "testmail@mail.de", "123456")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User signed in: " + user.displayName);

        dispatch(
          setSnackbarOptions({
            open: true,
            message: `Welcome back ${user.displayName} 👋`,
            severity: "success",
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Creates firebase auth user and creates custom user account used as profile for travelmap
  const createUserAccount = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    createUserWithEmailAndPassword(auth, "testmail@mail.de", "123456")
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
        console.log("New User created: " + user.displayName);

        // create new firebase doc for user
        addUserDoc(user.uid).then(() => {
          dispatch(
            setSnackbarOptions({
              open: true,
              message: `Welcome to Nomad Log ${user.displayName}! 👋`,
              severity: "success",
            })
          );

          // after first registration, open settings page to fill out rest of profile data
          navigate("/settings");
        });
      })
      .catch((error) => {
        console.log("Error creating account: " + error);
        // ..
      });
  };

  const logoutUser = async () => {
    setLoading(true);

    await signOut(auth);
    dispatch(
      setSnackbarOptions({
        open: true,
        message: `Good bye 👋`,
        severity: "info",
      })
    );
    setIsAuthenticated(false);
    dispatch(resetSelectedUser());
    navigate("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        setIsAuthenticated(true);
        setUser(currentUser);
        setLoading(false);

        dispatch(
          setSnackbarOptions({
            open: true,
            message: `Welcome back ${currentUser.displayName}! 👋`,
            severity: "info",
          })
        );
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        logoutUser,
        loading,
        isAuthenticated,
        createUserAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
