const Todo = require("../models/Todo");
const {todoSchema} = require("../validators/todoValidator");

// Read the Todos
const getTodos = async (req,res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const query = {
            user : req.user
        };
        if(req.query.completed){
            query.completed = req.query.completed === "true";
        }
    // fetch paginated todos   
        const todos = await Todo.find(query)
        .populate("user", "name email")
        .skip(skip)
        .limit(limit)
        .sort({createdAt: -1});
        
    // total count
        const total = await Todo.countDocuments({user : req.user});
        res.json({
            total,
            page,
            pages : Math.ceil(total/limit),
            todos
        });
    } catch (error){
        res.status(500).json({message:error.message})
    }
};

// Create the Todo
const createTodo = async (req,res) => {
    try{
    console.log(todoSchema);
    
    const validatedData = todoSchema.parse(req.body);

    const todo = await Todo.create({
        ...validatedData,
        user : req.user
    });
       
    res.json({message : "Todo added", todo});
} catch(error) {
    res.status(500).json({error : error.message || error.message});
}
}; 
// Overdue Todo 
const getOverdueTodos = async (req,res) => {
    const today = new Date();

    const overdue = await Todo.find({
        user : req.user,
        dueDate : {$lt : today},
        completed : false
    });
    res.json(overdue);
};

//Delete the Todo
const deleteTodo = async (req,res) => {
    const id = req.params.id;
    const todo = await Todo.findByIdAndDelete({
        _id : id,
        user : req.user
    });
    if(!todo){
        return res.status(400).json({message : "Todo not found"});
    }
    res.json({message: "Todo Deleted"});
};

//Update the Todo
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
        message: "Todo not found",
      });
    }

    Object.assign(todo, validatedData);

    await todo.save();

    res.json({
      message: "Todo updated",
      todo,
    });

  } catch (error) {

    res.status(400).json({
      error: error.message,
    });

  }
};

// Toggle Todo
const toggleTodo = async (req, res) => {

  const todo = await Todo.findOne({
    _id: req.params.id,
    user: req.user,
  });

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  todo.completed = !todo.completed;

  await todo.save();

  res.json({
    message: "Todo toggled",
    todo,
  });
};

module.exports = {
    getTodos,
    createTodo,
    getOverdueTodos,
    deleteTodo,
    updateTodo,
    toggleTodo
};