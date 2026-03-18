const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json("No autorizado");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto123");

    if (decoded.role !== "admin") {
      return res.status(403).json("Solo admin");
    }

    next();
  } catch (err) {
    return res.status(401).json("Token inválido");
  }
};

module.exports = isAdmin;