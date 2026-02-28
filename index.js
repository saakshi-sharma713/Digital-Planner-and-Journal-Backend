import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import { checkConnection } from "./DBHealthCheck/DBHeathCheck.js";
import { UserRouter } from "./Routes/user.route.js";
import { TodoRouter } from "./Routes/task.route.js";
import { journalRouter } from "./Routes/journal.route.js";
import { MoodRouter } from "./Routes/mood.route.js";
import { habitRouter} from "./Routes/habit.route.js";
import { goalsRouter } from "./Routes/goal.route.js";
import { dashboardRouter } from "./Routes/dashboard.route.js";
import bodyParser from "body-parser";

const app = express();
const PORT=process.env.PORT;
app.use(bodyParser.json());
app.use(cors());  
app.use(express.json());
app.use("/user",UserRouter);
app.use("/todo",TodoRouter);
app.use("/journal",journalRouter);
app.use("/mood",MoodRouter);
app.use("/habits",habitRouter);
app.use("/goals",goalsRouter);
app.use("/api/dashboard",dashboardRouter)


app.listen(PORT,()=>{
    const status = checkConnection();
    if(!status){
        console.log("Unable to connect");
         
    }
    console.log("Database Connected SuccessFully");
})





