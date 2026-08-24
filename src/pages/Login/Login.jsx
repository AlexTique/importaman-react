/**
 * pages/Login/Login.jsx
 * ---------------------------------------------------------------------------
 * Componente Inicio de sesión (login), definido en la evidencia EV02,
 * punto 9. Permite a los usuarios autenticarse mediante correo electrónico
 * y contraseña (RF02).
 *
 * ACTUALIZACIÓN (evidencia GA7-220501096-AA5-EV01): ya existe el backend/API
 * real (Node.js + Express + MySQL, proyecto ALEX_TIQUE_AA5_EV01). Este
 * componente ahora hace una petición real con fetch al endpoint
 * POST /api/auth/login en lugar de simular la sesión con localStorage.
 * ---------------------------------------------------------------------------
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

// URL base de la API de autenticación (proyecto ALEX_TIQUE_AA5_EV01)
const API_URL = "http://localhost:3000/api/auth";

function Login() {
  const navegar = useNavigate();

  // Formulario controlado: cada campo se guarda en el estado del componente
  const [formulario, setFormulario] = useState({ correo: "", clave: "" });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  /** Actualiza el estado del formulario cada vez que el usuario escribe (onChange) */
  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  }

  /** Valida y procesa el envío del formulario (onSubmit) */
  async function manejarEnvio(evento) {
    evento.preventDefault();

    if (!formulario.correo || !formulario.clave) {
      setError("Por favor completa correo y contraseña.");
      return;
    }

    setError("");
    setCargando(true);

    try {
      // Petición real al backend: POST /api/auth/login
      const respuesta = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: formulario.correo,
          clave: formulario.clave,
        }),
      });

      const datos = await respuesta.json();

      // Si la API responde con un status distinto de 2xx, "respuesta.ok" es false
      if (!respuesta.ok) {
        setError(datos.mensaje || "Error en la autenticación.");
        return;
      }

      // Autenticación satisfactoria: guardamos los datos del usuario
      // devueltos por la API (ya no se inventan en el cliente)
      localStorage.setItem("importaman_usuario", JSON.stringify(datos.usuario));

      navegar("/perfil");
    } catch (error) {
      // Este error ocurre si la API no está corriendo o hay un problema de red
      setError("No se pudo conectar con el servidor. Verifica que la API esté activa.");
    } finally {
      setCargando(false);
    }
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

          <button type="submit" className="auth__boton" disabled={cargando}>
            {cargando ? "Ingresando..." : "→ Ingresar"}
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
