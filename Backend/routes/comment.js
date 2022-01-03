import express from "express";

import { auth } from "../middleware/auth.js";
import { createPost } from "../controllers/comment.js";

const postRoad = express.Router();
postRoad.post("/create", auth,createPost);

export default postRoad;