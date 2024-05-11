import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../services/firebaseConfig";
import { setSnackbarOptions } from "../store/appSlice";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

type ActionType = "add" | "remove";
type ListType = "visited" | "bucketList";

// Toggles (add/remove) Country to visited, lived or bucket list
export const useToggleCountryInList = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const selectedCountry = useAppSelector(
    (state) => state.Country.selectedCountry
  );

  const toggleCountryInList = useCallback(
    async (action: ActionType, listType: ListType) => {
      if (user) {
        console.log(action);
        console.log(listType);

        const lists: Record<ListType, { firebaseField: string }> = {
          visited: {
            firebaseField: "countriesVisited",
          },
          bucketList: {
            firebaseField: "bucketList",
          },
        };

        const operation = action === "add" ? arrayUnion : arrayRemove;
        const messageSuccess =
          action === "add" ? "successfully added." : "successfully removed.";
        const messageError =
          action === "add" ? "could not be added." : "could not be removed.";

        const usersColRef = doc(db, "users", user.uid);

        try {
          await updateDoc(usersColRef, {
            [lists[listType].firebaseField]: operation(selectedCountry?.cca2),
          });

          dispatch(
            setSnackbarOptions({
              message: `${selectedCountry?.flag}${"  "}${
                selectedCountry?.name.common
              } ${messageSuccess}`,
              severity: "success",
            })
          );
        } catch (error) {
          dispatch(
            setSnackbarOptions({
              message: `${selectedCountry?.flag}${"  "}${
                selectedCountry?.name.common
              } ${messageError}`,
              severity: "error",
            })
          );

          // dispatch(setCountryActionsBar(true));
        }
      }
    },
    [user]
  );

  return { toggleCountryInList };
};
