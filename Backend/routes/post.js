import express from "express";

import { auth } from "../middleware/auth.js";
import { createPost, getAllPosts } from "../controllers/post.js";

const postRoad = express.Router();

postRoad.post("/post", auth, createPost);
postRoad.get("/allpost", auth, getAllPosts);

export default postRoad;
