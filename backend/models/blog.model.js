import mongoose, { Schema } from "mongoose";
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  blogImg: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: [200, "Should contain atleast 200 characters"],
  },
  adminName: {
    type: String,
  },
  adminPhoto: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});
//used it in controller to take data from user
const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
