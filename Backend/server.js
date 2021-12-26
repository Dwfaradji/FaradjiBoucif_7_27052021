// Crée un Programe qui va attendre notre requete http et y repondre

//Importer le package http node qui nous donnera accès a cet objet qui va nous permettre de crée un serveur

//const http = require('http');
import http from "http";

//Importer express
//const app = require("./app");
import { appli } from "./app.js";

//La Fonction normalizePort renvoi un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaine
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || "3000");
appli.set("port", port);

//La Fonction errorHandler recherche les erreurs et els gère de manière appropriée, ensuite elle est enregistrer dans le serveur
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Si le rejet d'une promesse n'est pas géré
process.on("unhandledRejection", (reason, promise) => {
  console.log(`Unhandled Rejection at: ${promise}\n` + `Reason: ${reason}`);
});

// Si une exception n'est ni attrapée ni traitée
process.on("uncaughtException", (err, origin) => {
  console.log(`Error: ${err}\n` + `Origin: ${origin}`);
});

const server = http.createServer(appli);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
