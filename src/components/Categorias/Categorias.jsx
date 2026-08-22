/**
 * components/Categorias/Categorias.jsx
 * ---------------------------------------------------------------------------
 * Componente Categorías de productos, definido en la evidencia EV02,
 * punto 3. Permite organizar los productos por categoría (RF11, RF12) y
 * que el usuario filtre el catálogo por categoría (RF13).
 *
 * Recibe por props:
 *  - categorias: arreglo de categorías disponibles (data/productos.js)
 *  - categoriaActiva: id de la categoría seleccionada actualmente
 *  - onSeleccionar: función que se ejecuta al hacer clic en una categoría
 *    (comunicación hijo -> padre mediante una función pasada por props)
 * ---------------------------------------------------------------------------
 */

import "./Categorias.css";

function Categorias({ categorias, categoriaActiva, onSeleccionar }) {
  return (
    <aside className="categorias">
      <h3>Categorías</h3>
      <ul>
        {/* Opción para limpiar el filtro y ver todos los productos */}
        <li>
          <button
            className={categoriaActiva === null ? "categorias__activa" : ""}
            onClick={() => onSeleccionar(null)}
          >
            🛍️ Todas
          </button>
        </li>

        {/* Se recorre el arreglo de categorías con .map() para generar
            un elemento de lista por cada una (renderizado de listas) */}
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            <button
              className={
                categoriaActiva === categoria.id ? "categorias__activa" : ""
              }
              onClick={() => onSeleccionar(categoria.id)}
            >
              <span>{categoria.icono}</span> {categoria.nombre}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Categorias;
