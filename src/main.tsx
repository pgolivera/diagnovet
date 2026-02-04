import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LanguageProvider } from "@i18n";
import theme from "./theme";
import App from "./App";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>
);
