import express from "express";
import mongoose from "mongoose";
import { userRoutes } from "./routes/userRoutes.js";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app=new express();

const router= express.Router();

// mongoose DB connection point
mongoose.connect(process.env.MONGO_PASSWORD);

const db=mongoose.connection;

// to be displayed in case of successfull connection
db.on("open",()=>{
    console.log("connection success");
});

// to be displayed in case of unsuccessfull connection
db.on("error",()=>{
    console.log("connection unsuccess");
});

// local port server
app.listen(4000,()=>{
    console.log("server is running at port 4000");
});

app.use(cors({
    origin:["https://event-management-system-eight-teal.vercel.app","http://localhost:5173"], 
    credentials:true,       
    optionSuccessStatus:200,
 }));
app.use(express.json());

userRoutes(app);
