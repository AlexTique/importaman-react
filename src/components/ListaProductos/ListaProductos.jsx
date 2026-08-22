/**
 * components/ListaProductos/ListaProductos.jsx
 * ---------------------------------------------------------------------------
 * Componente Lista de productos, definido en la evidencia EV02, punto 6.
 * Muestra todas las tarjetas de producto (<ProductCard />) disponibles
 * para la categoría seleccionada, organizándolas en una cuadrícula (Grid).
 * ---------------------------------------------------------------------------
 */

import ProductCard from "../ProductCard/ProductCard";
import "./ListaProductos.css";

function ListaProductos({ productos }) {
  // Si no hay productos que coincidan con el filtro aplicado, se informa
  // al usuario en lugar de mostrar una cuadrícula vacía sin explicación
  if (productos.length === 0) {
    return (
      <p className="lista-productos__vacio">
        No se encontraron productos en esta categoría.
      </p>
    );
  }

  return (
    <div className="lista-productos" id="productos">
      {/* .map() recorre el arreglo de productos y genera un <ProductCard />
          por cada uno. La prop "key" es obligatoria en React para que el
          motor de reconciliación (Virtual DOM) identifique cada elemento. */}
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}

export default ListaProductos;
