// Import
import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createComment,
  getAllComments,
  getOneComment,
  deleteComment,
} from "../controllers/comment.js";

// Variables
const commentRoad = express.Router();

// Route
commentRoad.post("/", auth, createComment);
commentRoad.get("/allcomments", getAllComments);
commentRoad.get("/:id", getOneComment);
commentRoad.delete("/delete/:id",auth, deleteComment);

// Export
export default commentRoad;
