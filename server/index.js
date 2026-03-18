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

// uso de rutas
app.use("/projects", projectsRoutes);
app.use("/auth", authRoutes);
app.use("/offers", offersRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
});