import { signup, login, userInfos, deleteUser } from "../controllers/user.js";
import { auth } from "../middleware/auth.js";
import express from "express";
const userRoad = express.Router();

userRoad.post("/signup", signup);
userRoad.post("/login", login);
userRoad.get("/profile", auth, userInfos);
userRoad.delete("/:id", deleteUser);

export default userRoad;
