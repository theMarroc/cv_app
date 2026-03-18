const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "secreto123";

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json("Faltan datos");

  try {
    // Verificar si el usuario ya existe
    const [existingUser] = await new Promise((resolve, reject) =>
      db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      })
    );

    if (existingUser?.length > 0) return res.status(400).json("Usuario ya existe");

    // Hashear contraseña
    const hashed = await bcrypt.hash(password, 10);

    // Guardar usuario (role por defecto "user")
    db.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashed, "user"],
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json("Usuario registrado con éxito");
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json("Error en el registro");
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  // 1. Buscar usuario
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(401).json("Usuario no encontrado");
      }

      const user = result[0];

      // 2. Comparar contraseña
      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(401).json("Contraseña incorrecta");
      }

      // 3. Crear token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        SECRET,
        { expiresIn: "1h" }
      );

      // 4. Enviar token
      res.json({ token });
    }
  );
};