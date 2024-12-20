//require('dotenv').config({path:"./env"});
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./db/index.js";
import {app} from "./app.js";

dotenv.config({
  path: "./env",
});


connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000, () => {
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
  });
})
.catch((e) => {
  console.log("MongoDB connection FAILED!!", e);
});









/*
import express from "express";

const app = express();

(async ()=>{
  try{
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    app.on("error",async (error)=>{
      console.log("SERVER CRASHED");
      throw error;
    })

    app.listen(process.env.PORT,()=>{
      console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
    })
  }
  catch(e){
    console.log("ERROR:",e);
  }
})

*/