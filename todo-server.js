const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

const todos = [
  {
    id: 1,
    task: "Buy groceries",
    isCompleted: false,
    description: "Purchase fruits, vegetables, and dairy products.",
  },
  {
    id: 2,
    task: "Clean the house",
    isCompleted: true,
    description:
      "Vacuum the living room, clean the bathrooms, and dust the furniture.",
  },
  {
    id: 3,
    task: "Finish homework",
    isCompleted: false,
    description:
      "Complete math exercises and write an essay for English class.",
  },
  {
    id: 4,
    task: "Pay bills",
    isCompleted: true,
    description: "Pay the electricity, water, and internet bills online.",
  },
  {
    id: 5,
    task: "Call mom",
    isCompleted: false,
    description: "Have a chat with mom and update her on the recent events.",
  },
  {
    id: 6,
    task: "Schedule dentist appointment",
    isCompleted: true,
    description:
      "Call the dentist office and set an appointment for the dental check-up.",
  },
];

// get all todos
app.get("/todos", (req, res) => {
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
