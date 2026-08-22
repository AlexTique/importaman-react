/**
 * components/Footer/Footer.jsx
 * ---------------------------------------------------------------------------
 * Componente Footer, definido en la evidencia GA7-220501096-AA4-EV02,
 * punto 12: datos de contacto, redes sociales, políticas de privacidad,
 * términos y condiciones, derechos de autor.
 * ---------------------------------------------------------------------------
 */

import "./Footer.css";

function Footer() {
  // Se calcula el año actual de forma dinámica para los derechos de autor
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__contenido contenedor">
        <div className="footer__columna">
          <h4>IMPORTAMAN</h4>
          <p>Tu tienda online de tendencia.</p>
        </div>

        <div className="footer__columna">
          <h4>Contacto</h4>
          <p>contacto@importaman.com</p>
          <p>Manizales, Colombia</p>
        </div>

        <div className="footer__columna">
          <h4>Redes sociales</h4>
          <p>Instagram · Facebook · TikTok</p>
        </div>

        <div className="footer__columna">
          <h4>Legal</h4>
          <p>Política de privacidad</p>
          <p>Términos y condiciones</p>
        </div>
      </div>

      <p className="footer__derechos">
        © {anioActual} IMPORTAMAN. Todos los derechos reservados.
      </p>
    </footer>
  );
}

export default Footer;
