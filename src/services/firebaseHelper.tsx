import {
  addDoc,
  setDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { setLoading, setSelectedUser } from "../store/userSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
import { UserType } from "../types/UserType";
import { FC, useCallback, useEffect } from "react";
import firebase from "firebase/compat/app";
import { setSnackbarOptions } from "../store/appSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

export type UpdateFirebaseFieldProps = {
  list: "countriesVisited" | "countriesBucketList" | "countriesLived";
  action: "add" | "remove";
  userData: UserType | undefined;
  selectedCountry: any;
};

// custom hook to update firebase field
// export const useUpdateFirebaseField = ({
//   list,
//   action,
//   userData,
//   selectedCountry,
// }: UpdateFirebaseFieldProps): (() => void) => {
//   const dispatch = useAppDispatch();

//   const updateField = useCallback(() => {
//     console.log("now");
//     if (userData && selectedCountry) {
//       const operation = action === "add" ? arrayUnion : arrayRemove;
//       const messageSuccess =
//         action === "add" ? "successfully added." : "successfully removed.";
//       const messageError =
//         action === "add" ? "could not be added." : "could not be removed.";
//       const usersColRef = doc(db, "users", userData.uid);

//       updateDoc(usersColRef, {
//         [list]: operation(selectedCountry?.cca2),
//       })
//         .then(() => {
//           dispatch(
//             setSnackbarOptions({
//               message: `${selectedCountry?.flag}  ${selectedCountry?.name.common} ${messageSuccess}`,
//               severity: "success",
//             })
//           );
//         })
//         .catch(() => {
//           dispatch(
//             setSnackbarOptions({
//               message: `${selectedCountry?.flag}  ${selectedCountry?.name.common} ${messageError}`,
//               severity: "error",
//             })
//           );
//         });
//     }
//   }, [list, action, userData, selectedCountry]);

//   return updateField;
// };

// export default const useUpdateFirebaseField: FC<UpdateFirebaseFieldProps> = ({
//   list,
//   action,
//   userDataObj,
//   selectedCountry,
// }) => {
//   const dispatch = useAppDispatch();

//   const operation = action === "add" ? arrayUnion : arrayRemove;
//   const messageSuccess =
//     action === "add" ? "successfully added." : "successfully removed.";
//   const messageError =
//     action === "add" ? "could not be added." : "could not be removed.";

//     const updateField = () => {
//       if (userDataObj) {
//         const usersColRef = doc(db, "users", userDataObj.uid);
//         updateDoc(usersColRef, {
//           [list]: operation(selectedCountry?.cca2),
//         })
//           // @ts-ignore
//           .then((response) => {
//             dispatch(
//               setSnackbarOptions({
//                 message: `${selectedCountry?.flag}${"  "}${
//                   selectedCountry?.name.common
//                 } ${messageSuccess}`,
//                 severity: "success",
//               })
//             );
//           }) // @ts-ignore
//           .catch((error) => {
//             dispatch(
//               setSnackbarOptions({
//                 message: `${selectedCountry?.flag}${"  "}${
//                   selectedCountry?.name.common
//                 } ${messageError}`,
//                 severity: "error",
//               })
//             );
//           })
//           .finally(() => {
//             console.log("done");
//           });
//       }
//     }

//   return {updateField};
// };

export const loadUserFromFirebase = (userId: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadUserData = async () => {
      console.log("true");
      dispatch(setLoading(true)); // Set loading state to true before fetching data
      if (userId) {
        try {
          const docRef = doc(db, "users", userId);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            dispatch(setSelectedUser(docSnap.data() as UserType));
          } else {
            console.log("Document does not exist");
          }
        } catch (error) {
          console.log(error);
        } finally {
          dispatch(setLoading(false)); // Set loading to false after fetching
        }
      }
    };
    loadUserData(); // Call the async function
  }, [userId, dispatch]);
};

export const addDocToFirebase = (selectedCountry: string) => {
  const addDocument = useCallback(async () => {
    try {
      const docRef = await addDoc(collection(db, "countriesVisited"), {
        selectedCountry,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, [selectedCountry]);

  return addDocument;
};

// useEffect(() => {
//   console.log(visitedCountriesCount);
// }, [visitedCountriesCount]);

// useEffect(() => {
//   async function fetchData() {
//     try {
//       const coll = collection(db, "countriesVisited");
//       const snapshot = await getCountFromServer(coll);
//       setVisitedCountriesCount(snapshot.data().count);
//       console.log("count: ", snapshot.data().count);
//     } catch (error) {}
//   }
//   console.log("ok");
//   fetchData();
// }, [countriesVisited]);

// const getUser = async () => {
//   await getDocs(collectionRef)
//     .then((userDataDoc) => {
//       // let todoData = userData.docs.map((user) => ({ ...user.data(), id: did }))
//       console.log(userDataDoc.docs);
//       setUserData(userDataDoc);
//       userDataDoc.forEach((doc) => {
//         console.log(doc.data());
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
