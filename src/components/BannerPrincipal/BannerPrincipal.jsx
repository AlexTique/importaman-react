/**
 * components/BannerPrincipal/BannerPrincipal.jsx
 * ---------------------------------------------------------------------------
 * Componente Banner Principal, definido en la evidencia EV02, punto 2.
 * Muestra promociones, descuentos y campañas comerciales de la tienda.
 *
 * Es un componente de presentación "puro": recibe la información por
 * props (título, subtítulo, imagen) en lugar de tenerla escrita de forma
 * fija, para que pueda reutilizarse con distintos contenidos si en el
 * futuro se agregan más campañas (ver RF27, estadísticas/promociones).
 * ---------------------------------------------------------------------------
 */

import bannerImg from "../../assets/img/bannerprincipal.png";
import "./BannerPrincipal.css";

function BannerPrincipal({
  titulo = "Bienvenido a IMPORTAMAN",
  subtitulo = "Los mejores productos de tendencia",
  textoBoton = "Ver productos",
  enlace = "#productos",
}) {
  return (
    <section
      className="banner"
      style={{ backgroundImage: `url(${bannerImg})` }}
    >
      <div className="banner__contenido contenedor">
        <h1>{titulo}</h1>
        <p>{subtitulo}</p>
        <a href={enlace} className="banner__boton">
          {textoBoton}
        </a>
      </div>
    </section>
  );
}

export default BannerPrincipal;
