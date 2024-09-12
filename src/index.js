import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Global CSS styles
import App from "./App"; // Main app component
import { ThemeProvider } from "@mui/material/styles"; // Material-UI theme provider
import theme from "./theme"; // Custom theme for Material-UI components
import { StoreProvider } from "./context/storeContext"; // Custom context provider
import { persistor, store } from "./redux/store"; // Redux store
import { Provider } from "react-redux"; // Redux Provider to pass the store
import { PersistGate } from "redux-persist/integration/react";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Creating the root element for rendering the React app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the app with various providers
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Provider store={store}>
            <PersistGate loading={"loading..."} persistor={persistor}>
              <StoreProvider>
                <Routes>
                  <Route path="/*" element={<App />} />
                </Routes>
              </StoreProvider>
            </PersistGate>
          </Provider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
