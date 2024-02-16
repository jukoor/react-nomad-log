import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { setSelectedUser } from "../store/userSlice";
import { useAppDispatch } from "../hooks/hooks";
import { UserType } from "../types/UserType";
import { useCallback } from "react";

export const loadUserFromFirebase = (userId: string) => {
  const dispatch = useAppDispatch();

  const loadUserData = useCallback(async () => {
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
