import "./styles/App.scss";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { app, db } from "./components/firebaseConfig";

import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { Profile } from "./pages/Profile";
import Menu from "./Menu";
import { Home } from "./pages/Home";
import { PageLayout } from "./PageLayout";
import {
  Box,
  CircularProgress,
  CssBaseline,
  LinearProgress,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CountryData, fetchCountriesData } from "./store/countrySlice";
import { AppDispatch } from "./store/store";
import { Country } from "./types/Country";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountriesData());
  }, []);

  return (
    <div className="app">
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
