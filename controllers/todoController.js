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
        const todos = await Todo.find({user: req.user, query : query})
        .populate("user", "name email")
        .skip(skip)
        .limit(limit)
        .sort({createdAt: -1});
        res.json(todos);
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
    const validatedData = todoSchema(req.body);

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
        dueDate : {$1t : today},
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
    if(!Todo){
        return res.status(400).json({message : "Todo not found"});
    }
    res.json({message: "Todo Deleted"});
};

//Update the Todo
const updateTodo = async (req,res) => {
    try{
    const validatedData = updateSchema.parse(req.body);
    const updated = await Todo.findOne({_id: req.params.id, user: req.user}
    );
    if(!Todo){
        return res.status(400).json({message: "Todo not found"});
    }
    Object.assign(Todo, validatedData);
    await Todo.save();
    res.json({message : "Todo updated"}, updated);
} catch(error){
    res.status(400).json({ error: error.errors || error.message });
}
};
// Toggle Todo
const toggleTodo = async (req,res) => {
    const id = req.params.id;

    const todo = await Todo.findById({_id:id, user: req.user});
    if(!todo){
        return res.status(404).json({message: "Todo not found"});
    }
    todo.completed = !todo.completed;
    await Todo.save()
    res.json({message : "Toggle Todo", todo});
};

module.exports = {
    getTodos,
    createTodo,
    getOverdueTodos,
    deleteTodo,
    updateTodo,
    toggleTodo
};