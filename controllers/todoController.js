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

    /*
    =========================
    FIND TODO
    =========================
    */

    const todo = await Todo.findById(
      req.params.id
    );


    /*
    =========================
    CHECK EXISTS
    =========================
    */

    if (!todo) {

      return res.status(404).json({

        success: false,

        message: "Todo not found",

      });

    }


    /*
    =========================
    OWNERSHIP CHECK
    =========================
    */
    console.log("REQ.USER:", req.user);

    console.log("TODO.USER:", todo.user);
    if (
      todo.user.toString() !==
      req.user.toString()
    ) {

      return res.status(401).json({

        success: false,

        message: "Unauthorized",

      });

    }


    /*
    =========================
    UPDATE ONLY FIELDS
    =========================
    */

    if (req.body.task !== undefined) {

      todo.task = req.body.task;

    }

    if (req.body.dueDate !== undefined) {

      todo.dueDate = req.body.dueDate;

    }

    if (req.body.priority !== undefined) {

      todo.priority = req.body.priority;

    }


    /*
    =========================
    SAVE
    =========================
    */

    const updatedTodo =
      await todo.save();


    /*
    =========================
    RESPONSE
    =========================
    */

    res.status(200).json({

      success: true,

      updated: updatedTodo,

    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({

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