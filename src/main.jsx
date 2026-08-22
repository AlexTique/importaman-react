/**
 * main.jsx
 * ---------------------------------------------------------------------------
 * Punto de entrada de la aplicación. Aquí se monta el componente raíz
 * <App /> en el DOM y se configura <BrowserRouter> de react-router-dom,
 * necesario para que funcionen las rutas definidas en App.jsx.
 * ---------------------------------------------------------------------------
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
