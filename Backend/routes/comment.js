import express from "express";

import { auth } from "../middleware/auth.js";
import { createPost,getAllComments } from "../controllers/comment.js";

const commentRoad = express.Router();
commentRoad.post("/", auth, createPost);
commentRoad.get('/allcomments', getAllComments)

export default commentRoad;
