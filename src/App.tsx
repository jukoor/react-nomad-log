import "./styles/App.scss";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { db } from "./components/firebaseConfig";

import BackgroundMap from "./components/Map";
import Sidebar from "./components/Sidebar";
import AppBar from "./components/NavBar";
import CountryInfo from "./components/CountryInfoOverlay";
import VisitedCountriesOverlay from "./components/VisitedCountriesOverlay";
import { loadCountryMetaDataFromAPI } from "./components/StaticDataLoader";

function App() {
  loadCountryMetaDataFromAPI();

  const handleOnClick = (e: any) => {};

  return (
    <div className="app">
      <AppBar />
      <BackgroundMap />

      {/* <Sidebar /> */}
      <VisitedCountriesOverlay />
      <CountryInfo />
    </div>
  );
}

export default App;
