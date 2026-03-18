//Lógica del controlador CRUD

const db = require("../config/db");

//Create
const createProject = (req, res) => {
    const { title, description, tech, link } = req.body;
    const icon = req.file ? req.file.filename : req.body.icon;

    // validación
    if (!title || !description || !tech) {
        return res.status(400).json("Faltan datos requeridos (título, descripción, tech)");
    }

    const query = "INSERT INTO projects (title, description, tech, icon, link) VALUES (?, ?, ?, ?, ?)";

    db.query(query, [title, description, tech, icon, link], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error al crear proyecto");
        }

        res.status(201).json({
            message: "Proyecto creado",
            id: result.insertId
        });
    });
};

//Update
const updateProject = (req, res) => {
    const { id } = req.params;
    const { title, description, tech, link, icon: existingIcon } = req.body;
    const icon = req.file ? req.file.filename : existingIcon;

    if (!title || !description || !tech) {
        return res.status(400).json("Faltan datos requeridos (título, descripción, tech)");
    }

    let query = `UPDATE projects SET title = ?, description = ?, tech = ?, link = ?`;
    let params = [title, description, tech, link || ""];

    if (icon) {
        query += `, icon = ?`;
        params.push(icon);
    }

    query += ` WHERE id = ?`;
    params.push(id);

    console.log("Intentando UPDATE con query:", query);
    console.log("Parámetros:", params);

    db.query(query, params, (err, result) => {
        if (err) {
            console.error("Error SQL detallado:", err);
            return res.status(500).json("Error de base de datos: " + err.message);
        }
        if (result.affectedRows === 0) {
            return res.status(404).json("Proyecto no encontrado");
        }
        res.json("Proyecto actualizado correctamente");
    });
};

//Read
const getProjects = (req, res) => {
    db.query("SELECT * FROM projects", (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error al obtener proyectos");
        }

        res.json(results);
    });
};

//Delete
const deleteProject = (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM projects WHERE id = ?";

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error al eliminar");
        }
        if (result.affectedRows === 0) {
        return res.status(404).json("Proyecto no encontrado");
    }

        res.json("Proyecto eliminado");
    });
};


module.exports = {
    createProject,
    getProjects,
    updateProject,
    deleteProject
};

