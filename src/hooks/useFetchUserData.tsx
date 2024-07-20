import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { setLoading, setSelectedUser } from "../store/userSlice";
import { UserType } from "../types/UserType";
import { useAppDispatch } from "./reduxHooks";
import { db } from "../context/AuthProvider";

// Fetch the userdata doc from firestore and store its value in redux
export const useFetchUserData = () => {
  const dispatch = useAppDispatch();

  const [user, loading, error] = useAuthState(getAuth());

  useEffect(() => {
    if (user?.uid) {
      const fetchUserData = async () => {
        try {
          dispatch(setLoading(true));
          const userDocRef = doc(db, "users", user?.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            dispatch(setSelectedUser(userDocSnap.data() as UserType));
            dispatch(setLoading(false));
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  return { user, loading, error };
};
