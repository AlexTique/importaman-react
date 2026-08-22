/**
 * components/ProductCard/ProductCard.jsx
 * ---------------------------------------------------------------------------
 * Componente Tarjeta de producto (product card), definido en la evidencia
 * EV02, punto 4. Muestra imagen, nombre, precio, descuento, calificación
 * y un botón "Agregar al carrito".
 *
 * Recibe el producto completo por props y no maneja su propio estado de
 * carrito: delega esa responsabilidad al contexto global (useCarrito),
 * cumpliendo el principio de "un componente, una responsabilidad".
 * ---------------------------------------------------------------------------
 */

import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import "./ProductCard.css";

function ProductCard({ producto }) {
  const { agregarProducto } = useCarrito();

  /**
   * Evento onClick del botón "Agregar".
   * Se detiene la propagación para que el clic en el botón no dispare
   * también la navegación del <Link> que envuelve toda la tarjeta.
   */
  function manejarAgregar(evento) {
    evento.preventDefault();
    agregarProducto(producto, 1);

    // Pequeña animación de retroalimentación en el propio botón,
    // equivalente a la animación "rebote" aplicada al ícono del carrito
    // en el prototipo HTML original (evidencia EV04).
    const boton = evento.currentTarget;
    boton.classList.add("animar-rebote");
    setTimeout(() => boton.classList.remove("animar-rebote"), 400);
  }

  // Genera la representación visual de la calificación en estrellas
  const estrellas = "★".repeat(producto.calificacion) +
    "☆".repeat(5 - producto.calificacion);

  return (
    <Link to={`/producto/${producto.id}`} className="product-card">
      {producto.descuento > 0 && (
        <span className="product-card__oferta">OFERTA</span>
      )}

      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="product-card__imagen"
      />

      <h3 className="product-card__nombre">{producto.nombre}</h3>

      <div className="product-card__precios">
        {producto.precioAnterior && (
          <span className="product-card__precio-anterior">
            ${producto.precioAnterior.toLocaleString("es-CO")}
          </span>
        )}
        <span className="product-card__precio">
          ${producto.precio.toLocaleString("es-CO")}
        </span>
        {producto.descuento > 0 && (
          <span className="product-card__descuento">-{producto.descuento}%</span>
        )}
      </div>

      <div className="product-card__estrellas">{estrellas}</div>

      <button className="product-card__boton" onClick={manejarAgregar}>
        Agregar
      </button>
    </Link>
  );
}

export default ProductCard;
