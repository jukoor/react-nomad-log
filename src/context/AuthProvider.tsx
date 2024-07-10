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
import {
  FirebaseUserDto,
  useAddFirebaseUser,
} from "../hooks/useAddFirebaseUser";
import { setSnackbarOptions, toggleMenuVisibility } from "../store/appSlice";
import { RegisterType } from "../types/RegisterType";

type AuthProviderProps = {
  children: ReactNode;
};

interface IAuthProviderContextProps {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  loginUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
  createUserAccount: (args: RegisterType) => Promise<void>;
}

const initialValues: IAuthProviderContextProps = {
  user: null,
  loading: false,
  isAuthenticated: false,
  loginUser: async () => {},
  logoutUser: async () => {},
  createUserAccount: async () => {},
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
  const createUserAccount = async ({
    email,
    password,
    firstName,
    lastName,
  }: RegisterType) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("New User created: " + user);

        const userData: FirebaseUserDto = {
          googleAuthUserUid: user.uid,
          firstName: firstName,
          lastName: lastName,
        };

        // create new firebase doc for user
        addUserDoc(userData).then(() => {
          dispatch(
            setSnackbarOptions({
              open: true,
              message: `Welcome to Nomad Log ${firstName}  ${lastName}! 👋`,
              severity: "success",
            })
          );

          // hide sidebar
          dispatch(toggleMenuVisibility());

          // after first registration, open settings page to fill out rest of profile data
          navigate("/settings");
        });
      })
      .catch((error) => {
        // Email already exists
        if (error.code == "auth/email-already-in-use") {
          dispatch(
            setSnackbarOptions({
              open: true,
              message: `Error creating account. Email is already in use.`,
              severity: "error",
            })
          );
        }
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
        loading,
        isAuthenticated,
        loginUser,
        logoutUser,
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