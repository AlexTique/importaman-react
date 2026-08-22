/**
 * components/Header/Header.jsx
 * ---------------------------------------------------------------------------
 * Componente Header (encabezado), definido en la evidencia
 * GA7-220501096-AA4-EV02, punto 1.
 *
 * Descripción (según EV02): estará presente en todas las páginas del
 * sistema y permitirá al usuario acceder rápidamente a las funciones
 * principales: logo, barra de búsqueda, menú principal, botón de inicio
 * de sesión y acceso al carrito de compras.
 *
 * Es un componente funcional (no de clase), en línea con la recomendación
 * de la evidencia EV01: "React recomienda utilizar componentes funcionales
 * con Hooks por ser más simples y fáciles de mantener".
 * ---------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import logo from "../../assets/img/logo.png";
import "./Header.css";

function Header() {
  // Estado local para el texto de búsqueda (controlado con onChange)
  const [busqueda, setBusqueda] = useState("");

  // Estado local para saber si la página ha hecho scroll, y así oscurecer
  // el encabezado (mismo efecto visual que auth.css / estilos.css del
  // prototipo HTML original, evidencia EV04)
  const [conScroll, setConScroll] = useState(false);

  // Se obtiene el total de artículos en el carrito desde el contexto global
  const { totalItems } = useCarrito();

  // useEffect: se ejecuta una vez montado el componente, para escuchar
  // el evento "scroll" de la ventana (tabla de eventos, evidencia EV01)
  useEffect(() => {
    function manejarScroll() {
      setConScroll(window.scrollY > 30);
    }
    window.addEventListener("scroll", manejarScroll);

    // Función de limpieza: se ejecuta al desmontar el componente, para
    // no dejar el listener activo (buena práctica de useEffect)
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  /** Maneja el envío del formulario de búsqueda (evento onSubmit) */
  function manejarBusqueda(evento) {
    evento.preventDefault();
    if (busqueda.trim() !== "") {
      alert(`Buscando productos que coincidan con: "${busqueda}"`);
    }
  }

  return (
    <header className={`header ${conScroll ? "header--scroll" : ""}`}>
      <div className="header__contenido contenedor">
        {/* Logo institucional, enlaza a Inicio */}
        <Link to="/" className="header__logo">
          <img src={logo} alt="Logo IMPORTAMAN" />
          <span>Importaman</span>
        </Link>

        {/* Barra de búsqueda (evento onChange + onSubmit) */}
        <form className="header__buscador" onSubmit={manejarBusqueda}>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </form>

        {/* Menú principal de navegación */}
        <nav className="header__nav">
          <Link to="/">Inicio</Link>
          <Link to="/#productos">Productos</Link>
          <Link to="/#ofertas">Ofertas</Link>
        </nav>

        <div className="header__acciones">
          {/* Acceso a inicio de sesión */}
          <Link to="/login" className="header__login">
            👤 Ingresar
          </Link>

          {/* Acceso al carrito de compras, con contador dinámico */}
          <Link to="/carrito" className="header__carrito">
            🛒 <span className="header__carrito-contador">{totalItems}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
