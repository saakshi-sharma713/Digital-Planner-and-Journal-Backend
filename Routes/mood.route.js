import express from "express"
import { addMood, deleteMood, getMood } from "../Controllers/mood.controller.js"
import { checkCredentials } from "../Middleware/auth.middleware.js"
const _route = express.Router()
_route.post("/add",checkCredentials,addMood)
_route.delete("/:id",deleteMood);
_route.get("/",checkCredentials,getMood);
export const MoodRouter = _route;