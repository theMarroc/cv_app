const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "secreto123";

// Helper para queries con promesas
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json("Faltan datos");

  try {
    const users = await query("SELECT * FROM users WHERE username = ?", [username]);
    if (users.length > 0) return res.status(400).json("Usuario ya existe");

    const hashed = await bcrypt.hash(password, 10);
    await query("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [username, hashed, "user"]);
    
    res.status(201).json("Usuario registrado con éxito");
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json("Error en el servidor");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json("Faltan datos");

  try {
    const users = await query("SELECT * FROM users WHERE username = ?", [username]);
    if (users.length === 0) return res.status(401).json("Usuario no encontrado");

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(401).json("Contraseña incorrecta");

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      SECRET,
      { expiresIn: "24h" } // Extendemos el tiempo a 24 horas para conveniencia
    );

    res.json({ token });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json("Error en el servidor");
  }
};