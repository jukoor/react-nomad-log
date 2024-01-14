import { addDoc, collection } from "firebase/firestore";
import { db } from ".././components/firebaseConfig";
import { Country } from "../store/countrySlice";

export const addDocToFirebase = async (selectedCountry: Country) => {
  console.log(selectedCountry);
  try {
    const docRef = await addDoc(collection(db, "countriesVisited"), {
      countryIcon: selectedCountry.countryIcon,
      countryNameFull: selectedCountry.countryNameFull,
      countryNameShort: selectedCountry.countryNameShort,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
