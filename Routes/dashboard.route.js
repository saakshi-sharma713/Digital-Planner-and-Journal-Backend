import express from "express";
import { getDashboardSummary, getGoalsProgress, getMoodTrend, getTasksTrend } from "../Controllers/dashboard.controller.js";
import { checkCredentials } from "../Middleware/auth.middleware.js";
const router = express.Router()



router.get("/summary", checkCredentials, getDashboardSummary) 
router.get("/tasks-trend",checkCredentials, getTasksTrend) 
router.get("/mood-trend", checkCredentials, getMoodTrend)  
router.get("/goals",checkCredentials, getGoalsProgress)  

export const dashboardRouter = router;