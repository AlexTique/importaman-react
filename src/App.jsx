/**
 * App.jsx
 * ---------------------------------------------------------------------------
 * Componente raíz de la aplicación (componente "App" descrito en la
 * "Estructura general de componentes del proyecto" de la evidencia
 * GA7-220501096-AA4-EV02): actúa como contenedor de todos los componentes
 * que conforman la interfaz de usuario e integra el Header y el Footer,
 * que están presentes durante toda la navegación.
 *
 * Las rutas definidas aquí corresponden directamente al árbol jerárquico
 * del mapa de navegación de la evidencia GA5-220501095-AA1-EV05:
 *   /            -> Inicio / Catálogo
 *   /producto/:id-> Detalle de producto
 *   /carrito     -> Carrito de compras
 *   /checkout    -> Checkout / Generar pedido
 *   /login       -> Iniciar sesión
 *   /registro    -> Registro
 *   /perfil      -> Perfil de usuario
 * ---------------------------------------------------------------------------
 */

import { Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import DetalleProducto from "./pages/DetalleProducto/DetalleProducto";
import CarritoCompras from "./pages/CarritoCompras/CarritoCompras";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import PerfilUsuario from "./pages/PerfilUsuario/PerfilUsuario";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    // CarritoProvider envuelve toda la aplicación para que cualquier
    // componente (Header incluido) pueda leer/modificar el carrito.
    <CarritoProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<CarritoCompras />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        {/* Ruta comodín: cualquier URL no definida muestra la página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </CarritoProvider>
  );
}

export default App;
