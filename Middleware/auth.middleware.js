import { verifyToken } from "../Services/auth.services.js";
import dotenv from "dotenv"
dotenv.config();
export async function checkCredentials(req,res,next){
    try{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"No token is passed",status:false})
    }
    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token,process.env.secret_key);
    console.log(decoded)
    req.user = decoded;
    next();
}
catch(error){
    return res.status(401).json({message:error.message})
}
}