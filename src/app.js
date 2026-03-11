import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

//basic configurations
app.use(express.json({limit:"16kb"}));
app.use(urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));

app.use(cookieParser());
//cors config
app.use(cors({
    origin:process.env.CORS_ORIGIN?.split(",")||"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"],
}),
);

//import the routes
import healthcheck from "./routes/healthcheck.routes.js";
import authRouter from "./routes/auth.routes.js";
import projectRouter from "./routes/project.routes.js";
import taskRouter from "./routes/task.routes.js";
import noteRouter from "./routes/note.routes.js";


app.use("/api/v1/healthcheck",healthcheck);
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/projects",projectRouter);
app.use("/api/v1/projects",taskRouter);
app.use("/api/v1/projects",noteRouter);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/insta', (req, res) => {
  res.send('Hi');
});

export default app;