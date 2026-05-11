const express = require("express");

const router = express.Router();

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} = require("../controllers/todoController");

const protect = require("../middleware/authmiddleware");


router.get("/todos", protect, getTodos);

router.post("/todos", protect, createTodo);

router.put("/todos/:id", protect, updateTodo);

router.patch(
  "/todos/:id/toggle",
  protect,
  toggleTodo
);

router.delete(
  "/todos/:id",
  protect,
  deleteTodo
);

module.exports = router;