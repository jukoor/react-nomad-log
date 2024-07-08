import { BrowserRouter } from "react-router-dom";
import { PageLayout } from "./layout/PageLayout";
import "./styles/global/App.scss";
import { ParallaxProvider } from "react-scroll-parallax";
import { AppRoutes } from "./routes/AppRoutes";
import AuthProvider from "./context/AuthProvider";

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <ParallaxProvider>
          <BrowserRouter>
            <PageLayout>
              <AppRoutes />
            </PageLayout>
          </BrowserRouter>
        </ParallaxProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
