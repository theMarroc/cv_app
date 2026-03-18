//Endpoints

const isAdmin = require("../middleware/isAdmin");

const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = path.join(__dirname, '../uploads');
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const { createProject, getProjects, updateProject, deleteProject } = require("../controllers/projectsController");

router.post("/", isAdmin, upload.single('icon'), createProject);

router.get("/", getProjects);

router.put("/:id", isAdmin, upload.single('icon'), updateProject);

router.delete("/:id", isAdmin, deleteProject);

module.exports = router;