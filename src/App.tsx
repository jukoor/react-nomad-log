import "./App.css";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { db } from "./components/firebaseConfig";

import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import AppBar from "./components/AppBar";

function App() {
  const handleOnClick = (e: any) => {};

  return (
    <div className="app">
      <AppBar />
      <Map />

      {/*<Sidebar />*/}
    </div>
  );
}

export default App;
