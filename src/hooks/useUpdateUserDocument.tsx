import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserType } from "../types/UserType";
import { useAppDispatch } from "./reduxHooks";
import { setSnackbarOptions } from "../store/appSlice";
import { setSelectedUser } from "../store/userSlice";

export const useUpdateUserDocument = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();

  const updateUserDocument = useCallback(
    async (formValues: UserType) => {
      if (user) {
        console.log(formValues);
        setLoading(true);
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);

        try {
          await updateDoc(userDocRef, formValues);
          setLoading(false);
          console.log("User document updated successfully");
          // update User data in Redux store
          dispatch(setSelectedUser(formValues));

          // show success snackbar
          dispatch(
            setSnackbarOptions({
              open: true,
              message: "Profile updated successfully.",
              severity: "success",
            })
          );
        } catch (error) {
          setError(error as Error);
          setLoading(false);
          dispatch(
            setSnackbarOptions({
              open: true,
              message: "Profile could not be updated. Please retry later.",
              severity: "error",
            })
          );
          console.error("Error updating user document:", error);
        }
      }
    },
    [user]
  );

  return { updateUserDocument, loading, error };
};
