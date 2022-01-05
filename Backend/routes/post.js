import express from "express";

import { auth } from "../middleware/auth.js";
import { createPost, getAllPosts } from "../controllers/post.js";

const postRoad = express.Router();

postRoad.post("/wall", auth, createPost);
postRoad.get("/wall", auth, getAllPosts);

export default postRoad;
