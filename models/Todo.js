const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
   },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Todo",
  todoSchema
);