const Todo = require("../models/Todo");

const {
  todoSchema,
} = require("../validators/todoValidator");


// GET TODOS
const getTodos = async (req, res) => {

  try {

    const todos = await Todo.find({
      user: req.user,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      todos,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
};


// CREATE TODO
const createTodo = async (req, res) => {

  try {

    const validatedData =
      todoSchema.parse(req.body);

    const todo = await Todo.create({
      ...validatedData,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      todo,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      error: error.message,
    });

  }
};


// UPDATE TODO
const updateTodo = async (req, res) => {

  try {

    const validatedData =
      todoSchema.partial().parse(req.body);

    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }

    Object.assign(todo, validatedData);

    await todo.save();

    res.json({
      success: true,
      todo,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      error: error.message,
    });

  }
};


// DELETE TODO
const deleteTodo = async (req, res) => {

  try {

    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }

    res.json({
      success: true,
      message: "Todo deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
};


// TOGGLE TODO
const toggleTodo = async (req, res) => {

  try {

    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found",
      });
    }

    todo.completed = !todo.completed;

    await todo.save();

    res.json({
      success: true,
      todo,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
};


module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
};