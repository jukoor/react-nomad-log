import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

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
