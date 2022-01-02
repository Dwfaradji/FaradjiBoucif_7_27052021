import express from "express";

import { auth } from "../middleware/auth.js";
import { allPostWall, createPost } from "../controllers/post.js";

const postRoad = express.Router();
postRoad.post("/create", auth, createPost);

export default postRoad;