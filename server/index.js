const projectsRoutes = require("./routes/projectsRoutes");
const authRoutes = require("./routes/authRoutes");
const offersRoutes = require("./routes/offersRoutes");

const db = require("./config/db");

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ruta de base
app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

// test DB
app.get("/test-db", (req, res) => {
    db.query("SELECT 1", (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error en la DB");
        }
        res.json(result);
    });
});

// Asegurar que existe la carpeta de subidas
const fs = require("fs");
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log("Directorio de uploads creado en:", uploadsDir);
}

// uso de rutas
app.use("/projects", projectsRoutes);
app.use("/auth", authRoutes);
app.use("/offers", offersRoutes);

// Manejador de errores global para capturar los 500
app.use((err, req, res, next) => {
    console.error("ERROR GLOBAL CAPTURADO:", err);
    res.status(500).json({
        error: "Error interno del servidor",
        mensaje: err.message,
        path: req.path
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
});