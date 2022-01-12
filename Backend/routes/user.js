import { signup, login, userInfos, deleteUser,updateInfoUser} from "../controllers/user.js";
import { auth } from "../middleware/auth.js";
import { multer } from "../middleware/multer-config.js";
import express from "express";
const userRoad = express.Router();

userRoad.post("/signup", signup);
userRoad.post("/login", login);
userRoad.get("/profile", auth, multer,userInfos);
userRoad.delete("/:id", deleteUser);
userRoad.post("/photo", auth, multer, updateInfoUser);

export default userRoad;
