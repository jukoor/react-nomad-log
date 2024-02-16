import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { setSelectedUser } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { UserType } from "../types/UserType";
import { useCallback } from "react";

// Annahme: Du hast bereits den Benutzer-UID (z. B. aus der Authentifizierung)
export const addToArray = async (countryToAdd: string) => {
  const userData = useAppSelector((state) => state.User.selectedUser);

  try {
    await updateDoc(doc(db, "users", userData.uid), {
      array: arrayUnion(countryToAdd),
    });
    console.log("Element erfolgreich zum Array hinzugefügt!");
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Elements:", error);
  }
};

export const createGroceryList = (selectedCountry: string) => {
  const userData = useAppSelector((state) => state.User.selectedUser);

  const groceriesColRef = collection(db, `users/${userData.uid}`);
  // return addDoc(groceriesColRef, {
  //   selectedCountry,
  // });
};

export const loadUserFromFirebase = (userId: string) => {
  const dispatch = useAppDispatch();

  const loadUserData = useCallback(async () => {
    if (userId) {
      try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        console.log();
        if (docSnap.exists()) {
          dispatch(setSelectedUser(docSnap.data() as UserType));
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [userId, dispatch]);

  return loadUserData;
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
