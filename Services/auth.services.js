import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config();
export function getToken(payload){
return jwt.sign({id:payload.id},process.env.secret_key);
}

export  function verifyToken(token){
    return jwt.verify(token,process.env.secret_key);
}