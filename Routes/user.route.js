import express from "express"
import { handleLogin, handleSignUp } from "../Controllers/user.controller.js";
import { checkCredentials } from "../Middleware/auth.middleware.js";
import { supabase } from "../Config/supabase.config.js";
const _route = express.Router();
_route.get("/home",checkCredentials,async(req,res)=>{
   const id = req.user;
   const{data,error} = await supabase.from("users").select().eq("id",id).single();
   console.log(id);
   const {name}= data
   return res.send(`Hello ${name}`);
})
_route.post("/login",handleLogin);
_route.post("/SignUp",handleSignUp);

export const UserRouter = _route; 