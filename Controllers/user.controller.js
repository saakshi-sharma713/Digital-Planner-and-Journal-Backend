import { supabase } from "../Config/supabase.config.js";
import bcrypt from "bcrypt";
import { getToken } from "../Services/auth.services.js";
export async function handleLogin(req,res){
    try{
   const {email,password} = req.body;
   if(!email || !password ){
    return res.status(400).json({message:"All fields are required",status:false})
   }
   
   const {data,error} = await supabase.from("users").select().eq("email",email).single();
   const status = bcrypt.compare(password,data.password);
   if(!status){
    return res.status(401).json({message:"Incorrect Password"})
   }
   if(error){
    return res.json({message:error.message});
   }
   const token = getToken(data,process.env.secret_key)
   return res.json({message:"User Logged In SuccessFully",token,status:true,name:data.name})
}
catch(error){
    return res.json({error:error.message})
}
}


export async function handleSignUp(req,res){
    const {name,email,password} = req.body;
    if(!name||!email||!password){
        return res.status(400).json({message:"All fields are required",status:false})
    }
    const hashedPassword = await  bcrypt.hash(password,10);
    const{data,error} = await supabase.from("users").insert([{
        name,
        email,
        password:hashedPassword
    }]).select().single();
    if(error){
        return res.status(401).json({message:error.message,status:false})
    }
    return res.json({message:"User Logged In SuccessFully",data,status:true})
}