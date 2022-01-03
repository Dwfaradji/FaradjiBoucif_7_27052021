import userRoad from "./routes/user.js";
import postRoad from "./routes/comment.js";

import express from "express";
import bodyParser from "body-parser";
import {database} from "./config/sequelize.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const appli = express();

//permet acceder à notre API depuis n'importe quelle origine

appli.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
async function testBd() {
  try {
    await database.authenticate();
    console.log("Bienvenue sur le server groupomania.");
  } catch (error) {
    console.error("Echec du lancement du server", error);
  }
}
testBd();

appli.use(bodyParser.urlencoded({ extended: true }));
appli.use(bodyParser.json());
appli.use("/images", express.static(path.join(__dirname, "images")));

appli.use("/api/auth/", userRoad);
appli.use("/api/posts/", postRoad);