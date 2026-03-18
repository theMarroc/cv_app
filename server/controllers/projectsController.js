//Lógica del controlador CRUD

const db = require("../config/db");

//Create
const createProject = (req, res) => {
    const { title, description, tech, link } = req.body;
    const icon = req.file ? req.file.filename : req.body.icon;

    // validación
    if (!title || !description || !tech || !icon || !link) {
        return res.status(400).json("Faltan datos");
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
    const { title, description, tech, link } = req.body;
    const icon = req.file ? req.file.filename : req.body.icon;

    if (!title || !description || !tech || !icon || !link) {
        return res.status(400).json("Faltan datos");
    }

    const query = `
        UPDATE projects 
        SET title = ?, description = ?, tech = ?, icon = ?, link = ?
        WHERE id = ?
    `;

    db.query(query, [title, description, tech, icon, link, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json("Error al actualizar");
        }
        if (result.affectedRows === 0) {
        return res.status(404).json("Proyecto no encontrado");
    }

        res.json("Proyecto actualizado");
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

