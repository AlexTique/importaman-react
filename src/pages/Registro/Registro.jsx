/**
 * pages/Registro/Registro.jsx
 * ---------------------------------------------------------------------------
 * Componente Registro de usuario, definido en la evidencia EV02, punto 10.
 * Permite crear nuevas cuentas dentro de la plataforma (RF01).
 *
 * ACTUALIZACIÓN (evidencia GA7-220501096-AA5-EV01): ya existe el backend/API
 * real (Node.js + Express + MySQL, proyecto ALEX_TIQUE_AA5_EV01). Este
 * componente ahora hace una petición real con fetch al endpoint
 * POST /api/auth/registro en lugar de simular el registro con localStorage.
 * ---------------------------------------------------------------------------
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

// URL base de la API de autenticación (proyecto ALEX_TIQUE_AA5_EV01)
const API_URL = "http://localhost:3000/api/auth";

// Valores iniciales del formulario, para poder reutilizarlos al reiniciar
const valoresIniciales = {
  nombres: "",
  apellidos: "",
  correo: "",
  clave: "",
  confirmarClave: "",
};

function Registro() {
  const navegar = useNavigate();
  const [formulario, setFormulario] = useState(valoresIniciales);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  }

  /** Validaciones básicas del formulario y registro real contra la API */
  async function manejarEnvio(evento) {
    evento.preventDefault();

    if (Object.values(formulario).some((campo) => campo.trim() === "")) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (formulario.clave.length < 8) {
      setError("La contraseña debe tener mínimo 8 caracteres.");
      return;
    }

    if (formulario.clave !== formulario.confirmarClave) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError("");
    setCargando(true);

    try {
      // Petición real al backend: POST /api/auth/registro
      // (nótese que "confirmarClave" NO se envía, solo se usa para validar en el cliente)
      const respuesta = await fetch(`${API_URL}/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombres: formulario.nombres,
          apellidos: formulario.apellidos,
          correo: formulario.correo,
          clave: formulario.clave,
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.mensaje || "Error en la autenticación.");
        return;
      }

      // Registro exitoso: se redirige al login para que inicie sesión
      navegar("/login");
    } catch (error) {
      setError("No se pudo conectar con el servidor. Verifica que la API esté activa.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <main className="auth">
      <div className="auth__panel-visual">
        <h2>Únete y descubre lo último en tendencia</h2>
        <p>🎁 Beneficios exclusivos</p>
        <p>📦 Sigue tus pedidos</p>
        <p>🔒 Datos protegidos</p>
      </div>

      <div className="auth__tarjeta">
        <h1>Crea tu cuenta</h1>
        <p className="auth__subtitulo">Completa tus datos para disfrutar de IMPORTAMAN</p>

        <form onSubmit={manejarEnvio} className="auth__formulario">
          <div className="auth__fila">
            <div>
              <label htmlFor="nombres">Nombres</label>
              <input
                id="nombres"
                name="nombres"
                placeholder="Tus nombres"
                value={formulario.nombres}
                onChange={manejarCambio}
              />
            </div>
            <div>
              <label htmlFor="apellidos">Apellidos</label>
              <input
                id="apellidos"
                name="apellidos"
                placeholder="Tus apellidos"
                value={formulario.apellidos}
                onChange={manejarCambio}
              />
            </div>
          </div>

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
            placeholder="Mínimo 8 caracteres"
            value={formulario.clave}
            onChange={manejarCambio}
          />

          <label htmlFor="confirmarClave">Confirmar contraseña</label>
          <input
            id="confirmarClave"
            name="confirmarClave"
            type="password"
            placeholder="Repite tu contraseña"
            value={formulario.confirmarClave}
            onChange={manejarCambio}
          />

          {error && <p className="auth__error">{error}</p>}

          <button type="submit" className="auth__boton" disabled={cargando}>
            {cargando ? "Creando cuenta..." : "→ Crear cuenta"}
          </button>
        </form>

        <p className="auth__enlace">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </main>
  );
}

export default Registro;

