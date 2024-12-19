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

export {app};