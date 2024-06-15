import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";
import { PageLayout } from "./layout/PageLayout";
import "./styles/global/App.scss";
import { Settings } from "./pages/Settings";
import { Logout } from "./pages/Logout";
import { useFetchCountryDataFromApi } from "./hooks/useFetchCountryDataFromApi";
import { useFetchUserData } from "./hooks/useFetchUserdata";
import { ParallaxProvider } from "react-scroll-parallax";
import { useCheckAuth } from "./hooks/useCheckAuth";
import { Login } from "./pages/Login";

function App() {
  // Fetch all country data from API on App init
  useFetchCountryDataFromApi();

  // Fetch user data from Firestore DB
  useFetchUserData();

  // Check if User is authenticated/logged in
  useCheckAuth();

  return (
    <div className="app">
      <BrowserRouter>
        <ParallaxProvider>
          <PageLayout>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="profile/:userId" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="login" element={<Login />} />
              <Route path="logout" element={<Logout />} />
            </Routes>
          </PageLayout>
        </ParallaxProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
