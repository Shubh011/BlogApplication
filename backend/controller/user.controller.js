import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenandSaveCookies from "../jwt/authToken.js";
// perform async & await for asynchronous operations
export const register = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "User photo is required" });
    }
    const { photo } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res.status(400).json({
        message: "Invalid photo format. Only jpg and png are allowed",
      });
    }
    const { name, email, contact, password } = req.body;
    if (!name || !email || !password || !contact) {
      return res.status(400).json({ message: "All fields are Required" });
    }
    // Find user is Already exist in DB or not?
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      photo.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }
    // Used bcrypt to secure and provide hashing on password
    const hashPassword = await bcrypt.hash(password, 8);

    // Add new user into DB
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      contact,
      photo: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    });
    // Used async & await, when we get a data from another external sources then make DB to wait for a data
    await newUser.save();

    if (newUser) {
      // Used createTokenandSaveCookies function to create token and save cookies
      // store token to send token into DB
      const token = await createTokenandSaveCookies(newUser._id, res);
      console.log("Registration Token : ", token);
      return res.status(201).json({
        message: "User registered Successfully",
        newUser,
        token: token,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
  //to take data of user from postman
  const { name, password, email, contact } = req.body;
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Find user is Already exist in DB or not?
    const user = await User.findOne({ email }).select("+password");
    if (!user.password) {
      return res.status(400).json({ message: "User Password is Missing" });
    }
    // Used bcrypt to compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    // Used createTokenandSaveCookies function to create token and save cookies
    const token = await createTokenandSaveCookies(user._id, res);
    console.log("Login Token : ", token);
    res.status(200).json({
      message: "User logged in Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};
export const getMyProfile = async (req, res) => {
  const user = await req.user;
  res.status(200).json({ user });
};
