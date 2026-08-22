/**
 * pages/Login/Login.jsx
 * ---------------------------------------------------------------------------
 * Componente Inicio de sesión (login), definido en la evidencia EV02,
 * punto 9. Permite a los usuarios autenticarse mediante correo electrónico
 * y contraseña (RF02).
 *
 * NOTA IMPORTANTE: este proyecto es la evidencia del componente Front-End
 * (GA7-220501096-AA4-EV03); todavía no existe un backend/API real que
 * valide las credenciales. Por eso la autenticación se simula guardando
 * el usuario en localStorage. Cuando el proyecto avance a las evidencias
 * de Back-End, esta función deberá reemplazarse por una petición real
 * (por ejemplo, con fetch o axios) al servicio de autenticación.
 * ---------------------------------------------------------------------------
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const navegar = useNavigate();

  // Formulario controlado: cada campo se guarda en el estado del componente
  const [formulario, setFormulario] = useState({ correo: "", clave: "" });
  const [error, setError] = useState("");

  /** Actualiza el estado del formulario cada vez que el usuario escribe (onChange) */
  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  }

  /** Valida y procesa el envío del formulario (onSubmit) */
  function manejarEnvio(evento) {
    evento.preventDefault();

    if (!formulario.correo || !formulario.clave) {
      setError("Por favor completa correo y contraseña.");
      return;
    }

    // Simulación de sesión iniciada (ver nota en el encabezado del archivo)
    localStorage.setItem(
      "importaman_usuario",
      JSON.stringify({ correo: formulario.correo })
    );

    setError("");
    navegar("/perfil");
  }

  return (
    <main className="auth">
      <div className="auth__panel-visual">
        <h2>Lo último del mundo, para ti.</h2>
        <p>🛡️ Compra segura</p>
        <p>🏷️ Productos de tendencia</p>
        <p>🚚 Envíos rápidos</p>
      </div>

      <div className="auth__tarjeta">
        <h1>¡Bienvenido de nuevo!</h1>
        <p className="auth__subtitulo">
          Inicia sesión para continuar disfrutando de IMPORTAMAN
        </p>

        <form onSubmit={manejarEnvio} className="auth__formulario">
          <label htmlFor="correo">Correo electrónico</label>
          <input
            id="correo"
            name="correo"
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={formulario.correo}
            onChange={manejarCambio}
          />

          <label htmlFor="clave">Contraseña</label>
          <input
            id="clave"
            name="clave"
            type="password"
            placeholder="Ingresa tu contraseña"
            value={formulario.clave}
            onChange={manejarCambio}
          />

          {error && <p className="auth__error">{error}</p>}

          <button type="submit" className="auth__boton">
            → Ingresar
          </button>
        </form>

        <p className="auth__enlace">
          ¿No tienes una cuenta? <Link to="/registro">Crear una cuenta</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
