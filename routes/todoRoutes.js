const express = require("express");

const router = express.Router();

const {
    getTodos,
    createTodo,
    getOverdueTodos,
    deleteTodo,
    updateTodo,
    toggleTodo
} = require("../controllers/todoController");

const protect = require("../middleware/authmiddleware");

router.get("/todos", protect, getTodos);
router.post("/todos", protect, createTodo);
router.get("/todos/overdue", getOverdueTodos);
router.patch("/todos/:id/toggle", toggleTodo);
router.delete("todos/:id", deleteTodo);
router.put("/todos/:id", updateTodo);

module.exports  = router;