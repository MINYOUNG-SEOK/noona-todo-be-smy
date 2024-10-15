const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
      default: false,
    },
    priority: {
      type: String,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
