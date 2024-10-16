const Task = require("../model/Task");

const taskController = {};

// 할 일 생성
taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete, priority, description } = req.body;
    const { userId } = req;
    const newTask = new Task({
      task,
      isComplete,
      priority,
      description,
      author: userId,
    });
    await newTask.save();
    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

// 할 일 조회
taskController.getTask = async (req, res) => {
  try {
    const { priority } = req.query;
    const filter = priority ? { priority } : {};
    const taskList = await Task.find(filter).populate("author");
    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

// 할 일 수정
taskController.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      throw new Error("App can not find the task");
    }
    const fields = Object.keys(req.body);
    fields.map((item) => (task[item] = req.body[item]));
    await task.save();
    res.status(200).json({ status: "success", data: task });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

// 할 일 삭제
taskController.deleteTask = async (req, res) => {
  try {
    const deleteItem = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", data: deleteItem });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
};

module.exports = taskController;
