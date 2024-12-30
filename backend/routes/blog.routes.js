import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlogs,
  getMyBlogs,
  updateBlog,
} from "../controller/blog.controller.js";
import { isAuthenticated } from "../middleware/authuser.js";
const brouter = express.Router();
//used in index.js to define routes
brouter.post("/create", isAuthenticated, createBlog);
brouter.delete("/delete/:id", isAuthenticated, deleteBlog);
brouter.get("/all-blogs", isAuthenticated, getAllBlogs);
brouter.get("/single-blog/:id", isAuthenticated, getSingleBlogs);
brouter.get("/my-blog", isAuthenticated, getMyBlogs);
brouter.put("/update/:id", isAuthenticated, updateBlog);
export default brouter;
