const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  postProjectController,
  getAllProjectsController,
  updateTaskController,
  addTaskController,
} = require("../controllers/userController");

const router = express.Router();

router.post("/post-project", authMiddleware, postProjectController);

router.get("/fetch-all-project", authMiddleware, getAllProjectsController);

router.patch("/update-task/:taskId", authMiddleware, updateTaskController);

router.post("/add-task/:projectId", authMiddleware, addTaskController);

module.exports = router;
