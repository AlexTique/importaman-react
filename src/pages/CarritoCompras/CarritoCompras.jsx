/**
 * pages/CarritoCompras/CarritoCompras.jsx
 * ---------------------------------------------------------------------------
 * Componente Carrito de compras, definido en la evidencia EV02, punto 7.
 * Muestra nombre del producto, cantidad, precio, subtotal y total de la
 * compra (RF17), y permite aumentar/disminuir cantidad (RF15) y eliminar
 * productos (RF16).
 *
 * Consume el estado global mediante el hook personalizado useCarrito(),
 * en lugar de recibirlo por props, ya que el carrito debe ser accesible
 * desde varias páginas distintas (Header, DetalleProducto, Checkout).
 * ---------------------------------------------------------------------------
 */

import { Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import "./CarritoCompras.css";

function CarritoCompras() {
  const { items, aumentarCantidad, disminuirCantidad, eliminarProducto, totalCompra } =
    useCarrito();
  const navegar = useNavigate();

  // Carrito vacío: se muestra un estado alternativo con enlace al catálogo
  if (items.length === 0) {
    return (
      <main className="contenedor carrito-vacio">
        <h2>Tu carrito está vacío</h2>
        <p>Explora el catálogo y agrega los productos que más te gusten.</p>
        <Link to="/" className="carrito-vacio__boton">
          Ir al catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="contenedor carrito">
      <h2>Carrito de compras</h2>

      <table className="carrito__tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="carrito__producto">
                <img src={item.imagen} alt={item.nombre} />
                <span>{item.nombre}</span>
              </td>
              <td>${item.precio.toLocaleString("es-CO")}</td>
              <td>
                <div className="carrito__cantidad">
                  <button onClick={() => disminuirCantidad(item.id)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => aumentarCantidad(item.id)}>+</button>
                </div>
              </td>
              <td className="carrito__subtotal">
                ${(item.precio * item.cantidad).toLocaleString("es-CO")}
              </td>
              <td>
                <button
                  className="carrito__eliminar"
                  onClick={() => eliminarProducto(item.id)}
                  aria-label={`Eliminar ${item.nombre} del carrito`}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="carrito__resumen">
        <span>Total de la compra:</span>
        <strong>${totalCompra.toLocaleString("es-CO")}</strong>
      </div>

      <div className="carrito__acciones">
        <Link to="/" className="carrito__seguir">
          ← Seguir comprando
        </Link>
        <button className="carrito__continuar" onClick={() => navegar("/checkout")}>
          Continuar al pago →
        </button>
      </div>
    </main>
  );
}

export default CarritoCompras;
