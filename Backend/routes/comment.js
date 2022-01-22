// Import
import express from "express";
import { auth } from "../middleware/auth.js";
import { createComment, deleteComment } from "../controllers/comment.js";

// Variables
const commentRoad = express.Router();

// Route
commentRoad.post("/", auth, createComment);
commentRoad.delete("/delete/:id", auth, deleteComment);

// Export
export default commentRoad;
