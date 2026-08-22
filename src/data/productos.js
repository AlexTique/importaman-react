/**
 * data/productos.js
 * ---------------------------------------------------------------------------
 * Fuente de datos simulada (mock) del catálogo de IMPORTAMAN.
 *
 * En una aplicación en producción esta información vendría de una API o
 * base de datos (ver RF06-RF13 de la evidencia GA1-220501092-AA4-EV01).
 * Para efectos de esta evidencia, que se centra en el componente Front-End,
 * los productos se definen aquí como un arreglo estático que los componentes
 * <ListaProductos /> y <DetalleProducto /> consumen mediante props.
 * ---------------------------------------------------------------------------
 */

import lampara from "../assets/img/lampara.jpg";
import smartwatch from "../assets/img/smartwatch.jpg";
import antiarrugas from "../assets/img/antiarrugas.jpg";
import llavero from "../assets/img/llavero.jpg";
import proyector from "../assets/img/proyector.jpg";
import camara from "../assets/img/camara.jpg";

// Categorías disponibles (RF11, RF12, RF13)
export const categorias = [
  { id: "ropa", nombre: "Ropa", icono: "👕" },
  { id: "tecnologia", nombre: "Tecnología", icono: "💻" },
  { id: "accesorios", nombre: "Accesorios", icono: "🕶️" },
];

// Catálogo de productos (RF06, RF09, RF10)
export const productos = [
  {
    id: 1,
    nombre: "Lámpara Decorativa",
    categoria: "accesorios",
    precio: 50000,
    precioAnterior: 80000,
    descuento: 38,
    calificacion: 4,
    imagen: lampara,
    descripcion:
      "Lámpara colgante de diseño geométrico, ideal para decorar espacios modernos. Incluye bombillo LED de bajo consumo.",
    especificaciones: ["Material: metal y vidrio", "Voltaje: 110V-220V", "Incluye bombillo LED"],
    disponibilidad: true,
  },
  {
    id: 2,
    nombre: "Reloj Inteligente",
    categoria: "tecnologia",
    precio: 125000,
    precioAnterior: null,
    descuento: 0,
    calificacion: 5,
    imagen: smartwatch,
    descripcion:
      "Smartwatch con monitor de ritmo cardíaco, notificaciones inteligentes y resistencia al agua.",
    especificaciones: ["Pantalla táctil AMOLED", "Batería hasta 7 días", "Resistente al agua (IP68)"],
    disponibilidad: true,
  },
  {
    id: 3,
    nombre: "Antiarrugas Instantáneo",
    categoria: "accesorios",
    precio: 140000,
    precioAnterior: null,
    descuento: 0,
    calificacion: 5,
    imagen: antiarrugas,
    descripcion: "Crema antiarrugas de efecto instantáneo, fórmula dermatológicamente probada.",
    especificaciones: ["Contenido: 50ml", "Uso: diario", "Apto para todo tipo de piel"],
    disponibilidad: true,
  },
  {
    id: 4,
    nombre: "Llavero Antiestrés",
    categoria: "accesorios",
    precio: 30000,
    precioAnterior: null,
    descuento: 0,
    calificacion: 5,
    imagen: llavero,
    descripcion: "Llavero sensorial antiestrés, perfecto para aliviar la tensión en el día a día.",
    especificaciones: ["Material: silicona", "Colores disponibles: varios"],
    disponibilidad: true,
  },
  {
    id: 5,
    nombre: "Proyector Mini para Smartphone",
    categoria: "tecnologia",
    precio: 100000,
    precioAnterior: 199000,
    descuento: 50,
    calificacion: 5,
    imagen: proyector,
    descripcion: "Mini proyector portátil compatible con smartphones, ideal para cine en casa.",
    especificaciones: ["Resolución soportada: HD", "Conexión: Bluetooth / cable", "Portátil"],
    disponibilidad: true,
  },
  {
    id: 6,
    nombre: "Cámara con Impresión de Fotos",
    categoria: "tecnologia",
    precio: 180000,
    precioAnterior: null,
    descuento: 0,
    calificacion: 5,
    imagen: camara,
    descripcion: "Cámara instantánea con función de impresión inmediata de fotografías.",
    especificaciones: ["Impresión instantánea", "Batería recargable", "Incluye papel fotográfico"],
    disponibilidad: true,
  },
];
