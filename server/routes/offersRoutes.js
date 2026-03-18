const express = require("express");
const router = express.Router();

const { sendOffer } = require("../controllers/offersController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/", authMiddleware, sendOffer);

module.exports = router;
