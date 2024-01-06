import { addDoc, collection } from "firebase/firestore";
import { db } from ".././components/firebaseConfig";

const addDocToFirebase = async () => {
  try {
    const docRef = await addDoc(collection(db, "Lander"), {
      land: "Deutschland",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
