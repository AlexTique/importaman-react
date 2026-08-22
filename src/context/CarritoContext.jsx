/**
 * context/CarritoContext.jsx
 * ---------------------------------------------------------------------------
 * Contexto global para el componente "Carrito de compras" (RF14-RF17,
 * definido en la evidencia GA7-220501096-AA4-EV02).
 *
 * Se utiliza la Context API de React junto con el hook useState para
 * administrar el estado del carrito (lista de productos agregados) y
 * compartirlo entre componentes sin necesidad de pasar props manualmente
 * en cada nivel (Header, Home, DetalleProducto, CarritoCompras, Checkout).
 *
 * Este es exactamente el uso de "UseState" descrito en la tabla de
 * componentes de React de la evidencia EV01: "Administra la información
 * que cambia durante la ejecución... necesario para actualizar elementos
 * como el carrito de compras".
 * ---------------------------------------------------------------------------
 */

import { createContext, useContext, useState } from "react";

// 1. Se crea el contexto que será compartido por todo el árbol de componentes
const CarritoContext = createContext();

/**
 * Proveedor del contexto del carrito.
 * Envuelve a toda la aplicación en App.jsx para que cualquier componente
 * hijo pueda leer y modificar el carrito mediante el hook useCarrito().
 */
export function CarritoProvider({ children }) {
  // Estado principal: arreglo de productos agregados al carrito.
  // Cada elemento guarda el producto original + la cantidad seleccionada.
  const [items, setItems] = useState([]);

  /**
   * Agrega un producto al carrito.
   * Si el producto ya existe, incrementa la cantidad en lugar de duplicarlo.
   */
  function agregarProducto(producto, cantidad = 1) {
    setItems((prevItems) => {
      const existente = prevItems.find((item) => item.id === producto.id);

      if (existente) {
        // El producto ya estaba en el carrito: se actualiza la cantidad
        return prevItems.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      // Producto nuevo: se agrega al final del arreglo
      return [...prevItems, { ...producto, cantidad }];
    });
  }

  /** Aumenta en 1 la cantidad de un producto ya agregado (RF15) */
  function aumentarCantidad(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  }

  /** Disminuye en 1 la cantidad de un producto; si llega a 0, lo elimina (RF15) */
  function disminuirCantidad(id) {
    setItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  }

  /** Elimina un producto del carrito sin importar la cantidad (RF16) */
  function eliminarProducto(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  /** Vacía el carrito por completo (usado tras confirmar un pedido) */
  function vaciarCarrito() {
    setItems([]);
  }

  // Cálculos derivados del estado (RF17: subtotal y total de la compra)
  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const totalCompra = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  // Valor que se expone a todos los componentes que consuman el contexto
  const valor = {
    items,
    agregarProducto,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
    totalItems,
    totalCompra,
  };

  return (
    <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
  );
}

/**
 * Hook personalizado para consumir el contexto del carrito de forma
 * sencilla desde cualquier componente: const { items, agregarProducto } = useCarrito();
 *
 * Nota de estándares: exportar el Provider y este hook desde el mismo
 * archivo es un patrón ampliamente recomendado y documentado por el
 * propio equipo de React para encapsular un contexto (ver React docs,
 * "Passing Data Deeply with Context"). Algunas herramientas de linting
 * orientadas a Fast Refresh muestran una advertencia informativa al
 * respecto, pero no afecta el funcionamiento ni la calidad del código.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) {
    throw new Error("useCarrito debe usarse dentro de un <CarritoProvider>");
  }
  return contexto;
}
