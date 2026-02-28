import express from "express"
import { addJournal, deleteJournal, getJournals, getSingleJournal, updateJournal } from "../Controllers/journal.controller.js";
import { checkCredentials } from "../Middleware/auth.middleware.js";
import { checkConnection } from "../DBHealthCheck/DBHeathCheck.js";
const _route = express.Router();

_route.post("/add",checkCredentials,addJournal)
_route.get("/",checkCredentials,getJournals)
_route.get("/:id",checkCredentials, getSingleJournal);
_route.post("/add",checkCredentials, addJournal); 
_route.delete("/:id", deleteJournal); 
export const journalRouter = _route;