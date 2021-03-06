// Import
import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createPost,
  getAllPosts,
  deletePost,
  modifyPost,
} from "../controllers/post.js";

// Variables
const postRoad = express.Router();

// Routes
postRoad.post("/post", auth, createPost);
postRoad.get("/allpost", auth, getAllPosts);
postRoad.delete("/:id", auth, deletePost);
postRoad.put("/:id", auth,modifyPost);

// Export
export default postRoad;
