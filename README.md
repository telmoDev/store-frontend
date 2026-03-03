# Vue Store Frontend

Este es un frontend moderno y premium construido con Vue 3, Vite y Pinia, diseñado para integrarse con una API de pedidos y productos.

## 🚀 Características

- **Catálogo de Productos**: Listado con búsqueda profesional y filtros de ordenamiento.
- **Carrito de Compras**: Gestión persistente de artículos mediante Pinia.
- **Flujo de Checkout**: Formulario validado para la creación de pedidos.
- **Historial de Pedidos**: Seguimiento de pedidos anteriores con filtros de fecha y monto.
- **Diseño Premium**: Estética Dark Mode con Glassmorphism, tipografía 'Plus Jakarta Sans' y animaciones fluidas.

## 🛠️ Requisitos Previos

- **Node.js**: Versión 20.19.0 o superior.
- **Backend API**: El frontend está configurado para consumir endpoints en `http://localhost/api`.

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/telmoDev/store-frontend.git
   cd store-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto (puedes usar `.env.example` como base):
   ```env
   VITE_API_BASE_URL=http://localhost/api
   ```

## 🚀 Uso en Desarrollo

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173` (o el puerto que asigne Vite).

## 🏗️ Construcción para Producción

Para generar el bundle de producción:
```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

## 📂 Estructura del Proyecto

- `src/services/api.js`: Cliente centralizado para peticiones fetch.
- `src/stores/`: Lógica de estado global (Cart, Products, Orders).
- `src/views/`: Pantallas principales de la aplicación.
- `src/assets/main.css`: Sistema de diseño premium y variables CSS.

## 📄 Licencia

Este proyecto es privado.
