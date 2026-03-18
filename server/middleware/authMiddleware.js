const jwt = require("jsonwebtoken");

const SECRET = "secreto123";

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json("No autorizado");
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json("Token inválido");
  }
};