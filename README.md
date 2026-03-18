# CV Web App

## Requisitos
- Node.js
- MySQL

## Instalación y Ejecución

### 1. Base de Datos
1. Abre MySQL Workbench.
2. Crea una base de datos llamada `cv_app`.
3. Importa el archivo `cv_app.sql` (que deberás exportar previamente de tu BD actual mediante la herramienta *Data Export* de Workbench).

### 2. Servidor (Backend)
1. Navega a la carpeta `server`.
2. Instala las dependencias: `npm install`
3. Renombra el archivo `.env.example` a `.env` y coloca tus credenciales de MySQL (`DB_PASSWORD`, etc).
4. Inicia el servidor: `npm run dev`

### 3. Cliente (Frontend)
1. Navega a la carpeta `client`.
2. Instala las dependencias: `npm install`
3. Inicia la aplicación: `npm run dev` (o `npm start` dependiendo si usás vite o create-react-app).
