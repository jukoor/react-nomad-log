import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";
import { PageLayout } from "./layout/PageLayout";
import "./styles/global/App.scss";
import { Settings } from "./pages/Settings";
import { Logout } from "./pages/Logout";
import { useFetchCountryDataFromApi } from "./hooks/useFetchCountryDataFromApi";
import { useFetchUserData } from "./hooks/useFetchUserdata";

function App() {
  // Fetch all country data from API on App init
  useFetchCountryDataFromApi();
  // Fetch user data from Firestore DB
  useFetchUserData();

  return (
    <div className="app">
      <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logout" element={<Logout />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
