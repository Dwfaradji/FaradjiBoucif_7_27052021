import { signup, login } from "../controllers/user.js";
import express from "express";
const userRoad = express.Router();

userRoad.post("/user/signup", signup);
// userRoad.post("/login", login);

export default userRoad;
