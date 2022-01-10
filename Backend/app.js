import userRoad from "./routes/user.js";
import commentRoad from "./routes/comment.js";
import postRoad from "./routes/post.js";
import express from "express";
import bodyParser from "body-parser";
import { database } from "./config/sequelize.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

export const appli = express();

//Permet acceder à notre API depuis n'importe quelle origine
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

// Lancement de la base de donnée et syncronisation des tables avec ({force:true}).
async function runDatabase() {
  try {
    await database.sync();
    console.log("Bienvenue sur le server groupomania.");
    console.log("Syncronisation des tables BD");
  } catch (error) {
    console.error("Echec du lancement du server", error);
  }
}
runDatabase();

appli.use(bodyParser.urlencoded({ extended: true }));
appli.use(bodyParser.json());
appli.use("/images", express.static(path.join(__dirname, "images")));

appli.use("/api/auth", userRoad);
appli.use("/api/comments", commentRoad);
appli.use("/api/posts", postRoad);
