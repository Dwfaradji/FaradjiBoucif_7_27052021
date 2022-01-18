// Import
import {
  signup,
  login,
  userInfos,
  deleteUser,
  updatePicture,
} from "../controllers/user.js";
import { auth } from "../middleware/auth.js";
import { multer } from "../middleware/multer-config.js";
import express from "express";

// Variables
const userRoad = express.Router();

// Routes
userRoad.post("/signup", signup);
userRoad.post("/login", login);
userRoad.get("/profile", auth, multer, userInfos);
userRoad.delete("/:id", auth, deleteUser);
userRoad.post("/photo/:id", auth, multer, updatePicture);

// Export
export default userRoad;
