// routes/calendarRouter.js
import express from "express";
import {
  getEvents,
  addEvent,
  deleteEvent,
  addReminder,
} from "../Controllers/Calendar.controller.js";
import { checkCredentials } from "../Middleware/auth.middleware.js"; // JWT auth middleware

const router = express.Router();

// All routes require authentication
router.get("/", checkCredentials, getEvents);        // GET /calendar?user_id=...
router.post("/add", checkCredentials, addEvent);     
router.delete("/:id", checkCredentials, deleteEvent);
router.put("/add-reminder/:id",checkCredentials,addReminder)

export const calendarRouter = router;