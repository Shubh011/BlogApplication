import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/user.routes.js";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import brouter from "./routes/blog.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT;
const Mongo_url = process.env.MONOG_URI;
console.log(Mongo_url);

// to take json format data and converted it
//Middleware
app.use(express.json());
app.use(cookieParser());
// written express logic of fileupload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
//Connecting With DB
mongoose
  .connect(
    "mongodb+srv://singhshubhanjali01:1QTEHFMkVKs6yZox@cluster0.xbgqi.mongodb.net/CRUD"
  )
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("Not connected");
  });

// Define Routes
app.use("/api/users", router);
app.use("/api/blogs", brouter);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.listen(port, () => {
  console.log(`Example app listening on port, hello shubhanjali ${port}`);
});
