import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { setSelectedUser } from "../store/userSlice";
import { UserType } from "../types/UserType";
import { useAppDispatch } from "./reduxHooks";

// Fetch the userdata doc from firestore and store its value in redux
export const useFetchUserData = (uidFromUrl?: string) => {
  const dispatch = useAppDispatch();

  const [user, loading, error] = useAuthState(getAuth());

  useEffect(() => {
    // If uidToUse is set, use its value (uid) as query for firebase,
    // this makes it possible to view the profile page of others users without begin logged in.
    // Otherwise take the uid from the logged in user (Google Auth)
    const uidToUse = uidFromUrl ? uidFromUrl : user?.uid;

    if (uidToUse) {
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, "users", uidToUse);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            console.log("User data:", userDocSnap.data());
            dispatch(setSelectedUser(userDocSnap.data() as UserType));
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
