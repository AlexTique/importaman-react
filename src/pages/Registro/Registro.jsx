/**
 * pages/Registro/Registro.jsx
 * ---------------------------------------------------------------------------
 * Componente Registro de usuario, definido en la evidencia EV02, punto 10.
 * Permite crear nuevas cuentas dentro de la plataforma (RF01).
 *
 * Igual que en Login.jsx, la creación de la cuenta se simula en el
 * cliente (sin backend real) mediante localStorage, ya que esta
 * evidencia corresponde únicamente al componente Front-End del proyecto.
 * ---------------------------------------------------------------------------
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

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

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  }

  /** Validaciones básicas del formulario antes de "registrar" al usuario */
  function manejarEnvio(evento) {
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

    // Simulación de registro exitoso: se guarda el usuario y se redirige al login
    localStorage.setItem(
      "importaman_usuario",
      JSON.stringify({
        nombres: formulario.nombres,
        apellidos: formulario.apellidos,
        correo: formulario.correo,
      })
    );

    setError("");
    navegar("/login");
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

          <button type="submit" className="auth__boton">
            → Crear cuenta
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
