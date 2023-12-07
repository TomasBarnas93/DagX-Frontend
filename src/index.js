import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter  } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nextProvider } from "react-i18next";
import { enTranslation } from "./data/en";
import { svTranslation } from "./data/sv";
import { plTranslation } from "./data/pl";
import { LanguageProvider } from "./services/LanguageContext";
import ImageProvider from "./services/ImageContext";

const resources = {
  en: {
    translation: enTranslation,
  },
  sv: {
    translation: svTranslation,
  },
  pl: {
    translation: plTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("selectedLanguage") || "sv",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <HashRouter>
    <I18nextProvider i18n={i18n}>
      <ChakraProvider>
        <LanguageProvider>
          <ImageProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </ImageProvider>
        </LanguageProvider>
      </ChakraProvider>
    </I18nextProvider>
  </HashRouter>
);

reportWebVitals();
