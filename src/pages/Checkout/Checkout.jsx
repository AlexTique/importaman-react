/**
 * pages/Checkout/Checkout.jsx
 * ---------------------------------------------------------------------------
 * Componente Pasarela de pago (Checkout), definido en la evidencia EV02,
 * punto 8. Permite seleccionar el método de pago (RF23), revisar el
 * total del pedido y confirmar la transacción (RF18, RF19, RF24, RF25).
 *
 * El envío del formulario se maneja con el evento onSubmit y el estado
 * del método seleccionado con useState (formulario controlado).
 * ---------------------------------------------------------------------------
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import "./Checkout.css";

// Métodos de pago disponibles (RF25: el administrador podrá añadir nuevos)
const metodosPago = [
  { id: "tarjeta", nombre: "Tarjeta de crédito / débito" },
  { id: "pse", nombre: "PSE" },
  { id: "nequi", nombre: "Nequi" },
  { id: "contraentrega", nombre: "Pago contraentrega" },
];

function Checkout() {
  const { items, totalCompra, vaciarCarrito } = useCarrito();
  const navegar = useNavigate();

  const [metodoSeleccionado, setMetodoSeleccionado] = useState("tarjeta");
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState(null);

  /** Maneja el envío del formulario de pago (evento onSubmit) */
  function manejarConfirmacion(evento) {
    evento.preventDefault();

    // Se genera un número de pedido simple a partir de la fecha actual
    // (en un backend real, este id vendría de la base de datos, RF19)
    const nuevoNumero = `IMP-${Date.now().toString().slice(-8)}`;
    setNumeroPedido(nuevoNumero);
    setPedidoConfirmado(true);

    // Se vacía el carrito una vez el pedido queda registrado
    vaciarCarrito();
  }

  // Vista de confirmación tras completar el pago (RF19: confirmación de pedido)
  if (pedidoConfirmado) {
    return (
      <main className="contenedor checkout__confirmacion">
        <h2>✅ ¡Pedido confirmado!</h2>
        <p>
          Tu número de pedido es <strong>{numeroPedido}</strong>. Te
          enviaremos la información de seguimiento a tu correo registrado.
        </p>
        <button onClick={() => navegar("/")}>Volver al catálogo</button>
      </main>
    );
  }

  // Si no hay productos en el carrito, no tiene sentido mostrar el checkout
  if (items.length === 0) {
    return (
      <main className="contenedor checkout__vacio">
        <h2>No hay productos para pagar</h2>
        <button onClick={() => navegar("/")}>Ir al catálogo</button>
      </main>
    );
  }

  return (
    <main className="contenedor checkout">
      <h2>Finalizar compra</h2>

      <div className="checkout__cuerpo">
        {/* Resumen del pedido */}
        <section className="checkout__resumen">
          <h3>Resumen del pedido</h3>
          {items.map((item) => (
            <div className="checkout__item" key={item.id}>
              <span>
                {item.nombre} × {item.cantidad}
              </span>
              <span>${(item.precio * item.cantidad).toLocaleString("es-CO")}</span>
            </div>
          ))}
          <div className="checkout__total">
            <span>Total a pagar</span>
            <strong>${totalCompra.toLocaleString("es-CO")}</strong>
          </div>
        </section>

        {/* Formulario de método de pago (RF23) */}
        <form className="checkout__formulario" onSubmit={manejarConfirmacion}>
          <h3>Selecciona tu método de pago</h3>

          {metodosPago.map((metodo) => (
            <label key={metodo.id} className="checkout__opcion-pago">
              <input
                type="radio"
                name="metodoPago"
                value={metodo.id}
                checked={metodoSeleccionado === metodo.id}
                onChange={(e) => setMetodoSeleccionado(e.target.value)}
              />
              {metodo.nombre}
            </label>
          ))}

          <button type="submit" className="checkout__boton-confirmar">
            Confirmar pedido
          </button>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
