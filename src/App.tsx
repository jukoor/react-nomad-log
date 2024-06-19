import { BrowserRouter } from "react-router-dom";
import { PageLayout } from "./layout/PageLayout";
import "./styles/global/App.scss";
import { ParallaxProvider } from "react-scroll-parallax";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  // Todo nur fetchen countires wenn eingeloggt

  return (
    <div className="app">
      <ParallaxProvider>
        <BrowserRouter>
          <PageLayout>
            <AppRoutes />
          </PageLayout>
        </BrowserRouter>
      </ParallaxProvider>
    </div>
  );
}

export default App;
