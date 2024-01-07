import "./styles/App.scss";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { db } from "./components/firebaseConfig";

import BackgroundMap from "./components/Map";
import Sidebar from "./components/Sidebar";
import AppBar from "./components/NavBar";
import CountryInfo from "./components/CountryInfo";

function App() {
  const handleOnClick = (e: any) => {};

  return (
    <div className="app">
      <AppBar />
      <BackgroundMap />

      {/* <Sidebar /> */}
      <CountryInfo />
    </div>
  );
}

export default App;
