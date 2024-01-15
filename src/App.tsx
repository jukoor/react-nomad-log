import "./styles/App.scss";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { db } from "./components/firebaseConfig";

import BackgroundMap from "./components/Map";
import Sidebar from "./components/Sidebar";
import AppBar from "./components/NavBar";
import CountryInfo from "./components/CountryInfoOverlay";
import VisitedCountriesOverlay from "./components/VisitedCountriesOverlay";
import { loadCountryMetaDataFromAPI } from "./components/StaticDataLoader";
import { Layout } from "maplibre-gl";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { Profile } from "./pages/Profile";
import Menu from "./Menu";
import { Home } from "./pages/Home";
import { PageLayout } from "./PageLayout";
import { CssBaseline } from "@mui/material";

function App() {
  // loadCountryMetaDataFromAPI();

  const handleOnClick = (e: any) => {};

  return (
    <div className="app">
      {/* <BackgroundMap /> */}

      {/* <Sidebar /> */}
      {/* <VisitedCountriesOverlay />
      <CountryInfo /> */}
      <CssBaseline />
      <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="profile/:userId" element={<Profile />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
