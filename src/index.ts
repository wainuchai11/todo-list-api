import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [];
let idCounter = 1;

//Get all todos
app.get("/api/v1/todos/get-all", (req, res) => {
  res.json({
    message: "successful",
    data: todos,
    code: 200,
  });
});

//Create a new todo
app.post("/api/v1/todos/create", (req, res) => {
  const newTodo: Todo = {
    id: idCounter++,
    title: req.body.title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json({
    message: "successful",
    data: newTodo,
    code: 201,
  });
});

//Get a todo by id
app.get("/api/v1/todos/get/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    res.json({
      message: "successful",
      data: todo,
      code: 200,
    });
  } else {
    res.status(404).json({
      message: "Todo not found",
      data: null,
      code: 404,
    });
  }
});

//Update a todo by id
app.put("/api/v1/todos/update/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    res.json({
      message: "successful",
      data: todo,
      code: 200,
    });
  } else {
    res.status(404).json({
      message: "Todo not found",
      data: null,
      code: 404,
    });
  }
});

//Delete a todo by id
app.delete("/api/v1/todos/delete/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.status(204).json({
      message: "successful",
      data: null,
      code: 204,
    });
  } else {
    res.status(404).json({
      message: "Todo not found",
      data: null,
      code: 404,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
