// routes/calendarRouter.js
import express from "express";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../Controllers/Calendar.controller.js";
import { checkCredentials } from "../Middleware/auth.middleware.js";

const router = express.Router();

// Get all events for a user
router.get("/", getEvents);

// Add a new event
router.post("/add",checkCredentials, addEvent);

// Update an event
router.put("/:id", updateEvent);

// Delete an event
router.delete("/:id", deleteEvent);

export const calendarRouter = router