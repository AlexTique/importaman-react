/**
 * pages/Home/Home.jsx
 * ---------------------------------------------------------------------------
 * Página de Inicio / Catálogo. Corresponde al nodo raíz del mapa de
 * navegación definido en la evidencia GA5-220501095-AA1-EV05.
 *
 * Integra los componentes: BannerPrincipal, Categorias y ListaProductos,
 * tal como se describe en la "Estructura general de componentes" de la
 * evidencia EV02 (App -> Header/Banner/Footer, y por separado, Categorías
 * -> Lista de productos -> Tarjeta de producto).
 * ---------------------------------------------------------------------------
 */

import { useMemo, useState } from "react";
import BannerPrincipal from "../../components/BannerPrincipal/BannerPrincipal";
import Categorias from "../../components/Categorias/Categorias";
import ListaProductos from "../../components/ListaProductos/ListaProductos";
import { categorias, productos } from "../../data/productos";
import "./Home.css";

function Home() {
  // Estado local: categoría actualmente seleccionada por el usuario.
  // null representa "todas las categorías" (RF13).
  const [categoriaActiva, setCategoriaActiva] = useState(null);

  /**
   * useMemo evita recalcular el filtrado en cada render si la categoría
   * activa no ha cambiado; solo se vuelve a ejecutar cuando cambia
   * "categoriaActiva". Es una buena práctica de rendimiento en React.
   */
  const productosFiltrados = useMemo(() => {
    if (categoriaActiva === null) return productos;
    return productos.filter((p) => p.categoria === categoriaActiva);
  }, [categoriaActiva]);

  return (
    <main>
      <BannerPrincipal />

      <div className="home__cuerpo contenedor">
        <Categorias
          categorias={categorias}
          categoriaActiva={categoriaActiva}
          onSeleccionar={setCategoriaActiva}
        />
        <ListaProductos productos={productosFiltrados} />
      </div>
    </main>
  );
}

export default Home;
