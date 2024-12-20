import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))

app.use(express.json({limit:"20kb"}));
app.use(express.urlencoded({limit:"20kb",extended:false}));
app.use(express.static("public")); //images and assets will be kept here
app.use(cookieParser());

// routes import
import userRoutes from "./routes/user.routes.js";

// routes declaration
app.use("/api/v1/users",userRoutes);

//our url structure: https://localhost:8000/api/v1/users/register

export {app};