const express = require("express");
const {
  createTodo,
  readTodos,
  readTodoById,
  updateTodo,
  deleteTodo
} = require("../Controllers/todoController"); 
const authMiddleware = require("../Middlewares/authMiddleware");
const router = express.Router();

// Create a new Todo
router.post("/", authMiddleware, createTodo);

// Read all Todos
router.get("/", authMiddleware, readTodos);

// Read a Todo by ID
router.get("/:id", authMiddleware, readTodoById);

// Update a Todo by ID
router.put("/:id", authMiddleware, updateTodo);

// Delete a Todo by ID
router.delete("/:id", authMiddleware, deleteTodo);

module.exports = router;
