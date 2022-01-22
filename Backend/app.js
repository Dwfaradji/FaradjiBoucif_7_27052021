// Import
import userRoad from "./routes/user.js";
import commentRoad from "./routes/comment.js";
import postRoad from "./routes/post.js";
import express from "express";
import bodyParser from "body-parser";
import { database } from "./config/sequelize.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Export
export const appli = express();
// Constant
const __dirname = dirname(fileURLToPath(import.meta.url));

//Autorisation acceder à notre API
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

// Lancement de la base de donnée
async function runDatabase() {
  try {
    await database.sync({ alter: true }); //Chargement automatique des tables
    console.log("Bienvenue sur le server groupomania.");
    console.log("Syncronisation des tables BD");
  } catch (error) {
    console.error("Echec du lancement du server", error);
  }
}
runDatabase();

// Extension
appli.use(bodyParser.urlencoded({ extended: true }));
appli.use(bodyParser.json());
appli.use("/images", express.static(path.join(__dirname, "images")));

// Route
appli.use("/api/auth", userRoad);
appli.use("/api/comments", commentRoad);
appli.use("/api/posts", postRoad);
