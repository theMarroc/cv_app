const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "secreto123";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    console.log("Auth Middleware - FAILED: No token");
    return res.status(403).json("No autorizado");
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Auth Middleware - FAILED: Token error", err.message);
    return res.status(401).json("Token inválido");
  }
};