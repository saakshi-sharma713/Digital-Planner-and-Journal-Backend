import express from "express";
import {
  getHabits,
  addHabit,
  updateHabit,
  deleteHabit
} from "../Controllers/habit.controller.js";
import { checkCredentials } from "../Middleware/auth.middleware.js";
const router = express.Router();

// Routes
router.get("/",checkCredentials,getHabits);          // Get all habits
router.post("/",  checkCredentials,addHabit);          // Add new habit
router.put("/:id", updateHabit);     // Update habit completion
router.delete("/:id", deleteHabit);  // Delete a habit

export const habitRouter = router;