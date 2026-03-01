// routes/calendarRouter.js
import express from "express";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../Controllers/Calendar.controller.js";
import { checkCredentials } from "../Middleware/auth.middleware.js"; // JWT auth middleware

const router = express.Router();

// All routes require authentication
router.get("/", checkCredentials, getEvents);        // GET /calendar?user_id=...
router.post("/add", checkCredentials, addEvent);     // POST /calendar/add
router.put("/:id", checkCredentials, updateEvent);   // PUT /calendar/:id
router.delete("/:id", checkCredentials, deleteEvent);// DELETE /calendar/:id

export const calendarRouter = router;