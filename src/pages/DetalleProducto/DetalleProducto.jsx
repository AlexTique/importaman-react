/**
 * pages/DetalleProducto/DetalleProducto.jsx
 * ---------------------------------------------------------------------------
 * Componente Detalle de producto, definido en la evidencia EV02, punto 5.
 * Muestra toda la información específica de un producto seleccionado:
 * imágenes, nombre, precio, descripción, especificaciones técnicas,
 * disponibilidad, calificación y botón "Agregar al carrito" (RF10).
 *
 * Usa el hook useParams de React Router para leer el id del producto
 * desde la URL (por ejemplo: /producto/3), en línea con lo señalado en
 * la tabla de componentes de React de la evidencia EV01: "React Router:
 * administra la navegación entre páginas... permite cambiar de una vista
 * a otra sin recargar la aplicación".
 * ---------------------------------------------------------------------------
 */

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { productos } from "../../data/productos";
import { useCarrito } from "../../context/CarritoContext";
import "./DetalleProducto.css";

function DetalleProducto() {
  // useParams() devuelve los parámetros dinámicos definidos en la ruta
  const { id } = useParams();
  const { agregarProducto } = useCarrito();

  // Estado local para la cantidad que el usuario quiere agregar
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");

  // Se busca el producto correspondiente al id recibido por la URL.
  // Nota: los parámetros de useParams siempre son strings, por eso se
  // convierte "id" a número antes de comparar.
  const producto = productos.find((p) => p.id === Number(id));

  // Manejo del caso en que el id no corresponda a ningún producto
  if (!producto) {
    return (
      <main className="contenedor detalle-producto__no-encontrado">
        <h2>Producto no encontrado</h2>
        <Link to="/">Volver al catálogo</Link>
      </main>
    );
  }

  function manejarAgregar() {
    agregarProducto(producto, cantidad);
    setMensaje(`Se agregaron ${cantidad} unidad(es) al carrito.`);

    // El mensaje de confirmación desaparece luego de 2.5 segundos
    setTimeout(() => setMensaje(""), 2500);
  }

  const estrellas = "★".repeat(producto.calificacion) +
    "☆".repeat(5 - producto.calificacion);

  return (
    <main className="contenedor detalle-producto">
      <Link to="/" className="detalle-producto__volver">
        ← Volver al catálogo
      </Link>

      <div className="detalle-producto__cuerpo">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="detalle-producto__imagen"
        />

        <div className="detalle-producto__info">
          <h1>{producto.nombre}</h1>
          <div className="detalle-producto__estrellas">{estrellas}</div>

          <div className="detalle-producto__precios">
            {producto.precioAnterior && (
              <span className="detalle-producto__precio-anterior">
                ${producto.precioAnterior.toLocaleString("es-CO")}
              </span>
            )}
            <span className="detalle-producto__precio">
              ${producto.precio.toLocaleString("es-CO")}
            </span>
          </div>

          <p className="detalle-producto__descripcion">{producto.descripcion}</p>

          <h4>Especificaciones</h4>
          <ul className="detalle-producto__specs">
            {producto.especificaciones.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>

          <p className="detalle-producto__disponibilidad">
            {producto.disponibilidad
              ? "✅ Producto disponible"
              : "❌ Agotado temporalmente"}
          </p>

          <div className="detalle-producto__acciones">
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              id="cantidad"
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value) || 1)}
            />
            <button onClick={manejarAgregar} disabled={!producto.disponibilidad}>
              Agregar al carrito
            </button>
          </div>

          {mensaje && <p className="detalle-producto__mensaje">{mensaje}</p>}
        </div>
      </div>
    </main>
  );
}

export default DetalleProducto;
