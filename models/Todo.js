const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    task :{
        type : String,
        required : true
    },
    dueDate :{
        type : Date,
        required : true
    },
    completed :{
        type : Boolean,
        required : false
    },
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    }
}, {
    timestamps : true
});

module.exports = mongoose.model("Todo", todoSchema)