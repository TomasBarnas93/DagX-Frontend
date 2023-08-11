import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nextProvider } from "react-i18next";
import { enTranslation } from "./data/en";
import { svTranslation } from "./data/sv";
import { plTranslation } from "./data/pl";

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
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
  <ChakraProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </ChakraProvider>
  </I18nextProvider>,
  document.getElementById("root")
);

reportWebVitals();
