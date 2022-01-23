// Import
import jwt from "jsonwebtoken";

//Paramètre
const auth = (req, res, next) => {
  try {
    //Récupère seulement le token du header authorization de la requête
    const token = req.headers.authorization.split(" ")[1];
    //Decode le token en vérifiant le token avec celui présent dans la fonction login
    const decodedToken = jwt.verify(token, process.env.DB_TOKEN);
    //Récupère le userId
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Requête non authentifiée" });
  }
};
//Export
export { auth };
