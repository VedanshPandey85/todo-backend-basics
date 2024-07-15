const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

const todos = [];

// get all todos
app.get("/todos", (req, res) => {
  if (!todos) {
    res.send("Empty list pls add some todos using post request...");
  }
  res.json(todos);
});

//get todos using id
app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = todos.find((t) => t.id === id);
  console.log(data);

  if (!data) {
    res.status(404).send("Not Found!!");
  } else {
    res.json(data);
  }
});

// a middle-ware used for parsing incoming requests
app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 10000),
    task: req.body.task,
    isCompleted: false,
    description: req.body.description,
  };

  console.log(newTodo);
  todos.push(newTodo);

  res.status(200).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const todoid = req.params.id;

  const particularTodoData = todos.find((t) => t.id == todoid);

  if (!particularTodoData) {
    res.status(404).send("Todo not found!!!");
  } else {
    particularTodoData.description = req.body.description;
    particularTodoData.isCompleted = req.body.isCompleted;
    particularTodoData.task = req.body.task;
    res.status(200).json(particularTodoData);
  }
});

app.delete("/todos/:id", (req, res) => {
  const deleteTodoId = req.params.id;
  const foundIdx = todos.findIndex((t) => t.id === deleteTodoId);

  if (!foundIdx) res.status(404).send("Not found..");
  else {
    todos.splice(foundIdx, 1);
    res.status(200).json(todos);
  }
});

app.listen(PORT, () => {
  console.log(`The server is running over server ${PORT}`);
});
