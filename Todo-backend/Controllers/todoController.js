const Todo = require("../Models/todoModel");

exports.createTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const todo = await Todo.create({ title, description, userId: req.user.id , completed});
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: "Error creating todo" });
  }
};
// Read all Todos for the current user
exports.readTodos = async (req, res) => {
    try {
      const todos = await Todo.find({ userId: req.user.id });

      // console.log(req.user.id);

      res.status(201).json(todos);
    } catch (error) {
      res.status(400).json({ message: "Error fetching todos", error });
    }
  };
  
  // Search for a Todo by ID
  exports.readTodoById = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      // Fetch the Todo with the specified ID for the current user
      const todo = await Todo.findOne({ _id: id, userId: req.user.id });
  
      // Check if the Todo exists
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      res.status(200).json(todo);
    } catch (error) {
      res.status(400).json({ message: "Error fetching todo", error: error.message });
    }
  };
  
  
  // Update a Todo
  exports.updateTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
  
      const todo = await Todo.findOne({ _id: id, userId: req.user.id });

      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      todo.title = title || todo.title;
      todo.description = description || todo.description;
      await todo.save();
  
      res.status(200).json(todo);
    } catch (error) {
      res.status(400).json({ message: "Error updating todo", error });
    }
  };
  
  exports.deleteTodo = async (req, res) => {
    try {
      const { id } = req.params;
  
      // MongoDB query
      const todo = await Todo.findOne({ _id: id, userId: req.user.id });
  
      // For SQL/Sequelize
      // const todo = await Todo.findOne({ where: { id, userId: req.user.id } });
  
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      await Todo.deleteOne({ _id: id }); // MongoDB
     
  
      res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting todo", error });
    }
  };
  