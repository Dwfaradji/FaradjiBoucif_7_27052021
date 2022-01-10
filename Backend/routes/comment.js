import express from "express";

import { auth } from "../middleware/auth.js";
import { createComment,getAllComments,getOneComment } from "../controllers/comment.js";

const commentRoad = express.Router();
commentRoad.post("/", auth, createComment);
commentRoad.get('/allcomments', getAllComments)
commentRoad.get('/:id', getOneComment)

export default commentRoad;
