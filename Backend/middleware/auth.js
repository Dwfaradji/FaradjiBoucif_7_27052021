// Import
import jwt from "jsonwebtoken";

//Paramètre
const auth = (req, res, next) => {
  try {
    //Récupère seulement le token du header authorization de la requête
    const token = req.headers.authorization.split(" ")[1];
    //Decode le token en vérifiant le token avec celui présent dans la fonction login
    const decodedToken = jwt.verify(token, "DEVELOPMENT_TOKEN_SECRET");
    //Récupère le userId
    const userId = decodedToken.id;
    //Vérifie s'il y a un userId dans la requête et que celui ci est différent de l'user Id alors
    if (req.body.id && req.body.id !== userId) {
      //Renvoie l'erreur
      throw new Error("403:unauthorized request");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error | "Requête non authentifiée" });
  }
};

export { auth };
