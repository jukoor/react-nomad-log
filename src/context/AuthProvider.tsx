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
import { LoginType, RegisterType } from "../types/RegisterType";

type AuthProviderProps = {
  children: ReactNode;
};

interface IAuthProviderContextProps {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginUser: (args: LoginType) => Promise<void>;
  logoutUser: () => Promise<void>;
  createUserAccount: (args: RegisterType) => Promise<void>;
}

const initialValues: IAuthProviderContextProps = {
  user: null,
  isLoading: false,
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
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useAppDispatch();
  const { addUserDoc } = useAddFirebaseUser();
  const navigate = useNavigate();

  /* Login user to firebase with email and password methode */
  const loginUser = async ({ email, password }: LoginType) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error(error);
      if ("code" in error && error.code === "auth/invalid-credential") {
        dispatch(
          setSnackbarOptions({
            open: true,
            message: `Error logging in. Invalid credentials.`,
            severity: "error",
          })
        );
      }
    }
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
          // hide sidebar
          dispatch(toggleMenuVisibility());

          // after first registration, open settings page to fill out rest of profile data
          navigate("/settings");
        });
      })
      .catch((error) => {
        console.log(error.rcode);
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
      if (currentUser) {
        setIsAuthenticated(true);
        setUser(currentUser);
        setLoading(false);

        dispatch(
          setSnackbarOptions({
            open: true,
            message: `Welcome 👋`,
            severity: "success",
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
        isLoading,
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
