import firebase from "firebase/app";
import { initializeApp } from "firebase/app";

//import "firebase/database"; // If using Firebase database
//import "firebase/auth"; // If using Firebase authentication
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsJ54X8GyhzYvAj3BB2mlBATv6Jxrczu0",
  authDomain: "travelmap-82f18.firebaseapp.com",
  projectId: "travelmap-82f18",
  storageBucket: "travelmap-82f18.appspot.com",
  messagingSenderId: "887138175902",
  appId: "1:887138175902:web:ccfe5882b2a1c8f741648f",
};

export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service

export const db = getFirestore(app);
