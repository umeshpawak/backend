import express from "express";

const app = express(); // create a express app 

app.use(express.json());

// routes import 
import userRouter from './routes/user.route.js';


// routes declration 
app.use("/api/v1/users", userRouter);


//example routes : http://localhost:4000/api/v1/users/register


export default app;