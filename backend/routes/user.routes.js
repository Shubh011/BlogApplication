import express from "express";
import {
  register,
  login,
  logout,
  getMyProfile,
} from "../controller/user.controller.js";
import { isAuthenticated } from "../middleware/authuser.js";
const router = express.Router();
//used in index.js to define routes

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/my-profile", isAuthenticated, getMyProfile);
export default router;
