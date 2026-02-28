import express from "express"
import { addTodo, deleteTodo, getAllTodos, getTodo, searchTodos, updateTodo } from "../Controllers/task.controller.js";
import { checkCredentials } from "../Middleware/auth.middleware.js";
const _route = express.Router();
_route.get("/",checkCredentials,getAllTodos)
_route.post("/add",checkCredentials,addTodo);
_route.put("/update/:id",updateTodo);
_route.delete("/delete/:id",deleteTodo);
_route.get("/get/:id",getTodo);
_route.get("/search",checkCredentials,searchTodos);

export const TodoRouter = _route;