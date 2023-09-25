import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./index.css";
import { Router } from "./routes/routes.jsx";
import "./assets/locales";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PrimeReactProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </PrimeReactProvider>
);
