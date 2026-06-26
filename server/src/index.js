import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { recipesRouter } from "./routes/recipes.js";
import cloudinary from "cloudinary";
import cors from "cors";
import { userRouter } from "./routes/user.js";

dotenv.config();

const app = express();

app.use(express.json());


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));



app.use("/recipes", recipesRouter);

app.use("/auth", userRouter);



app.listen(3005, () => {
 console.log("Server started on http://localhost:3005");
});