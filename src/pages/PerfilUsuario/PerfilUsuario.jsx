/**
 * pages/PerfilUsuario/PerfilUsuario.jsx
 * ---------------------------------------------------------------------------
 * Componente Perfil de usuario, definido en la evidencia EV02, punto 11.
 * Permite consultar la información básica de la cuenta y cerrar sesión
 * (RF04: editar información del perfil; RF20: historial de pedidos).
 *
 * Usa el hook useEffect para leer el usuario "autenticado" (simulado en
 * Login.jsx / Registro.jsx mediante localStorage) apenas se monta el
 * componente.
 * ---------------------------------------------------------------------------
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PerfilUsuario.css";

function PerfilUsuario() {
  const navegar = useNavigate();

  // Se inicializa el estado leyendo directamente de localStorage mediante
  // una función de inicialización perezosa (lazy initializer). Esto es
  // preferible a usar useEffect + setState, ya que evita un renderizado
  // adicional innecesario: el valor está disponible desde el primer render.
  const [usuario, setUsuario] = useState(() => {
    const datosGuardados = localStorage.getItem("importaman_usuario");
    return datosGuardados ? JSON.parse(datosGuardados) : null;
  });

  function cerrarSesion() {
    localStorage.removeItem("importaman_usuario");
    setUsuario(null);
    navegar("/login");
  }

  // Si no hay usuario "autenticado", se invita a iniciar sesión
  if (!usuario) {
    return (
      <main className="contenedor perfil perfil--vacio">
        <h2>No has iniciado sesión</h2>
        <Link to="/login" className="perfil__boton">
          Iniciar sesión
        </Link>
      </main>
    );
  }

  return (
    <main className="contenedor perfil">
      <h2>Mi perfil</h2>

      <div className="perfil__tarjeta">
        <div className="perfil__avatar">
          {(usuario.nombres || usuario.correo)[0].toUpperCase()}
        </div>

        <div className="perfil__datos">
          {usuario.nombres && (
            <p>
              <strong>Nombre:</strong> {usuario.nombres} {usuario.apellidos}
            </p>
          )}
          <p>
            <strong>Correo:</strong> {usuario.correo}
          </p>
        </div>
      </div>

      <div className="perfil__secciones">
        <div className="perfil__seccion">
          <h3>📦 Historial de pedidos</h3>
          <p>Todavía no tienes pedidos registrados.</p>
        </div>
        <div className="perfil__seccion">
          <h3>📍 Dirección de envío</h3>
          <p>No has agregado una dirección de envío.</p>
        </div>
      </div>

      <button className="perfil__cerrar-sesion" onClick={cerrarSesion}>
        Cerrar sesión
      </button>
    </main>
  );
}

export default PerfilUsuario;
