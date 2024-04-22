import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";
import { PageLayout } from "./layout/PageLayout";
import "./styles/global/App.scss";
import { Country } from "./pages/Country";
import { Settings } from "./pages/Settings";
import { Logout } from "./pages/Logout";
import { useFetchCountryDataFromApi } from "./hooks/useFetchCountryDataFromApi";

function App() {
  // Fetch all country data from API on App init
  useFetchCountryDataFromApi();

  return (
    <div className="app">
      <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="country/:countryCode" element={<Country />} />
            <Route path="logout" element={<Logout />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
