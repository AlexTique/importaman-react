/**
 * pages/NotFound/NotFound.jsx
 * ---------------------------------------------------------------------------
 * Página que se muestra cuando la ruta visitada no coincide con ninguna
 * de las definidas en App.jsx (comodín "*" de React Router).
 * ---------------------------------------------------------------------------
 */

import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="contenedor not-found">
      <h1>404</h1>
      <p>La página que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  );
}

export default NotFound;
