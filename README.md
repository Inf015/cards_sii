# 💳 Cards SII — Prueba Técnica

Aplicación  para gestionar tarjetas con frontend en **Vue 3 + Vite** y backend en **Node.js + Express**.

---

## ⚙️ Tecnologías utilizadas

- **Frontend**
  - [Vue 3](https://vuejs.org/) — framework reactivo para construir interfaces dinámicas.
  - [Vite](https://vitejs.dev/) — bundler rápido usado para desarrollo moderno.
  - **CSS + estilos responsivos** — para la UI de la tarjeta y formularios.

- **Backend**
  - [Node.js](https://nodejs.org/) — entorno de ejecución para el servidor.
  - [Express](https://expressjs.com/) — framework minimalista para exponer endpoints REST.
  - [UUID](https://www.npmjs.com/package/uuid) — generación de identificadores únicos para las tarjetas.
  - [CORS](https://www.npmjs.com/package/cors) — habilitar comunicación entre frontend y backend.
  - [Nodemon](https://nodemon.io/) — recarga automática en desarrollo.

---

## 📦 Instalación y uso

### 1. Clonar el repositorio
```bash
git clone https://github.com/<tu-usuario>/cards_sii.git
cd cards_sii
```
### 2. Instalar dependencias del frontend
```bash
npm install
```
### 3. Ejecutar backend

En una terminal nueva:
```bash
cd api
npm install
npm run dev
```
👉 El API se levanta en http://localhost:3001

### 4. Ejecutar frontend

En la carpeta raíz del proyecto:
```bash
npm run dev
```
👉 El frontend corre en http://localhost:5173
## ✨ Funcionalidades implementadas
Frontend

    📌 Formulario de tarjeta con previsualización en tiempo real.

    ✅ Validaciones:

        Número de tarjeta: solo 16 dígitos.

        Nombre del titular: no permite números.

        Fecha de expiración: formato MM/YY.

        CVV: solo 3 dígitos numéricos.

    🎨 Estilos modernos (chip metálico, gradientes, light/dark mode).

    📋 Lista de tarjetas guardadas con formato enmascarado (12********2121).

Backend

    🔹 GET /cards → Listar todas las tarjetas guardadas.

    🔹 POST /cards → Crear una nueva tarjeta.

    🔹 PUT /cards/:id → Editar tarjeta existente.

    🔹 (Opcional) DELETE /cards/:id → Eliminar tarjeta.

📂 Estructura del proyecto
```
cards_sii/
├── api/                # Backend
│   ├── controllers/    # Controladores de lógica
│   ├── data/           # Almacenamiento temporal (JSON)
│   ├── routes/         # Definición de endpoints
│   ├── src/server.js   # Punto de entrada del servidor
│
├── src/                # Frontend (Vue 3 + Vite)
│   ├── components/     # CardForm, CardPreview, CardList
│   ├── utils/          # Validaciones y formateadores
│   ├── App.vue         # Componente raíz
│   ├── main.js         # Entrada del frontend
│
└── README.md           # Documentación
```
✅ Checklist de requisitos

Formulario con previsualización de tarjeta

Validaciones en todos los campos

Enmascarado de números de tarjeta

Persistencia de tarjetas en el backend

API con rutas GET y POST

Edición de tarjetas con PUT

Interfaz responsive y atractiva

👨‍💻 Autor

Desarrollado por Oliver Infante
Proyecto para práctica técnica — Cards SII.
