import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./store/store.tsx";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./layout/Theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
