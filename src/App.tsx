import { Routes, BrowserRouter } from "react-router-dom";
import { PageLayout } from "./layout/PageLayout";
import "./styles/global/App.scss";
import { useFetchCountryDataFromApi } from "./hooks/useFetchCountryDataFromApi";
import { useFetchUserData } from "./hooks/useFetchUserdata";
import { ParallaxProvider } from "react-scroll-parallax";
import { useCheckAuth } from "./hooks/useCheckAuth";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  // Todo nur fetchen countires wenn eingeloggt

  // Fetch  country data from API
  useFetchCountryDataFromApi();

  // Fetch user data from Firestore DB
  useFetchUserData();

  // Check if User is authenticated
  useCheckAuth();

  return (
    <div className="app">
      <BrowserRouter>
        <ParallaxProvider>
          <PageLayout>
            <AppRoutes />
          </PageLayout>
        </ParallaxProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
