import express from "express";
import { getGoals, addGoal, updateGoal, deleteGoal } from "../Controllers/goal.controller.js";
import { checkCredentials } from "../Middleware/auth.middleware.js";

const router = express.Router();

router.get("/",checkCredentials, getGoals);
router.post("/add",checkCredentials, addGoal);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

export const goalsRouter = router;