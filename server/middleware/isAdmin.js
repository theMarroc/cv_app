const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json("No autorizado");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto123");
    console.log("Admin Check - User:", decoded.username, "Role:", decoded.role);

    if (decoded.role !== "admin") {
      console.log("Admin Check - FAILED: Not an admin");
      return res.status(403).json("Solo admin");
    }

    next();
  } catch (err) {
    console.log("Admin Check - FAILED: Token error", err.message);
    return res.status(401).json("Token inválido");
  }
};

module.exports = isAdmin;