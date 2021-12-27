import userRoad from "./routes/user.js";
import postRoad from "./routes/post.js";

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
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

try {
  mongoose.connect(
    "mongodb+srv://boucif:Tlemcen-66@cluster0.wxji3.mongodb.net/myTwoDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("Connexion à MongoDB réussie !");
} catch (e) {
  console.log("Connexion à MongoDB échouée !");
}

appli.use(bodyParser.urlencoded({ extended: true }));
appli.use(bodyParser.json());
appli.use("/images", express.static(path.join(__dirname, "images")));

appli.use("/api/user/", userRoad);
appli.use("/api/post/", postRoad);
