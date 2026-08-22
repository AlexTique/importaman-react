# IMPORTAMAN — Componente Front-End (React)

Proyecto React del componente Front-End de **IMPORTAMAN**, tienda online de
tendencia, desarrollado como evidencia **GA7-220501096-AA4-EV03** del
programa Análisis y Desarrollo de Software (SENA, ficha 3186645).

Este proyecto es la implementación en código de los componentes definidos
previamente en la evidencia **GA7-220501096-AA4-EV02** ("Verificación de
procedimientos para la definición de componentes Front-End de la
aplicación"), y reutiliza la identidad visual y los flujos de navegación
definidos en las evidencias **GA5-220501095-AA1-EV03/EV04/EV05**
(prototipos, maquetación HTML y mapa de navegación).

## 🧱 Stack tecnológico

- **React 19** (componentes funcionales + Hooks, sin clases)
- **Vite** como herramienta de build y servidor de desarrollo
- **React Router DOM** para la navegación entre páginas (SPA)
- **Context API + useState** para el estado global del carrito de compras
- CSS puro, organizado por componente (sin framework externo), siguiendo
  la decisión documentada en la evidencia EV04

## 📁 Estructura del proyecto

```
src/
├── assets/img/          # Logo e imágenes de producto
├── components/           # Componentes reutilizables (definidos en EV02)
│   ├── Header/            # 1. Encabezado
│   ├── BannerPrincipal/   # 2. Banner principal
│   ├── Categorias/        # 3. Categorías de productos
│   ├── ProductCard/       # 4. Tarjeta de producto
│   ├── ListaProductos/    # 6. Lista de productos
│   └── Footer/            # 12. Pie de página
├── pages/                 # Páginas / vistas (rutas de React Router)
│   ├── Home/               # Inicio + Catálogo
│   ├── DetalleProducto/    # 5. Detalle de producto
│   ├── CarritoCompras/     # 7. Carrito de compras
│   ├── Checkout/           # 8. Pasarela de pago
│   ├── Login/               # 9. Inicio de sesión
│   ├── Registro/            # 10. Registro de usuario
│   ├── PerfilUsuario/       # 11. Perfil de usuario
│   └── NotFound/            # Página 404
├── context/
│   └── CarritoContext.jsx  # Estado global del carrito (useState + Context)
├── data/
│   └── productos.js        # Datos simulados del catálogo (mock)
├── App.jsx                 # Componente raíz + definición de rutas
└── main.jsx                 # Punto de entrada de la aplicación
```

## ▶️ Cómo ejecutar el proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar el servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
http://localhost:5173
```

Otros comandos disponibles:

```bash
npm run build     # Genera la build de producción en /dist
npm run preview   # Sirve la build de producción localmente
npm run lint      # Verifica estándares de codificación (oxlint)
```

## 🗺️ Rutas de la aplicación

| Ruta              | Página            | Requisito relacionado (GA1) |
|-------------------|-------------------|------------------------------|
| `/`               | Inicio / Catálogo | RF06, RF09, RF10, RF13       |
| `/producto/:id`   | Detalle de producto | RF10                      |
| `/carrito`        | Carrito de compras | RF14–RF17                  |
| `/checkout`       | Pasarela de pago   | RF18, RF19, RF23–RF25       |
| `/login`          | Inicio de sesión   | RF02                        |
| `/registro`       | Registro de usuario | RF01                       |
| `/perfil`         | Perfil de usuario  | RF04, RF20                  |

## ⚠️ Alcance de esta evidencia

Este proyecto corresponde **únicamente al componente Front-End** de
IMPORTAMAN. No existe todavía un backend/API real: el catálogo se sirve
desde `src/data/productos.js` (datos simulados) y la autenticación
(login/registro) se simula guardando el usuario en `localStorage`, tal
como se indica en los comentarios de `Login.jsx` y `Registro.jsx`. Estas
partes deberán conectarse a servicios reales en las evidencias
correspondientes al componente Back-End del proyecto formativo.

## 👤 Autor

Alex Armando Tique Jimenez — Análisis y Desarrollo de Software, ficha 3186645.
