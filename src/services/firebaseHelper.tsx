import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useEffect, useState } from "react";
import { setSelectedUser } from "../store/userSlice";
import { useAppDispatch } from "../hooks/hooks";
import { UserType } from "../types/UserType";

export const loadUserDataFromFb = () => {
  const dispatch = useAppDispatch();
  const userId = "SEkyqNajL0Yvp9AATRZI";

  useEffect(() => {
    const getUserDataFromFirestore = async () => {
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
    };

    getUserDataFromFirestore();
  }, []);
};

// export const addDocToFirebase = async (selectedCountry: Country) => {
//   console.log(selectedCountry);
//   try {
//     const docRef = await addDoc(collection(db, "countriesVisited"), {
//       countryIcon: selectedCountry.countryIcon,
//       countryNameFull: selectedCountry.countryNameFull,
//       countryNameShort: selectedCountry.countryNameShort,
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };

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
