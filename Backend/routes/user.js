import { signup, login, userInfos } from "../controllers/user.js";
import { auth } from "../middleware/auth.js";
import express from "express";
const userRoad = express.Router();

userRoad.post("/signup", signup);
userRoad.post("/login", login);
userRoad.get("/profile", auth, userInfos);

export default userRoad;
