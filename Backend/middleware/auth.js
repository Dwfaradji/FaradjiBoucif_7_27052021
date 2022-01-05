import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[0]; //Récupère seulement le token du header authorization de la requête
    const decodedToken = jwt.verify(token, "DEVELOPMENT_TOKEN_SECRET"); //Decode le token en vérifiant le token avec celui présent dans la fonction login
    const userId = decodedToken.id; //Récupère le userId
    if (req.body.id && req.body.id !== userId) {
      //Vérifie s'il y a un userId dans la requête et que celui ci est différent de l'user Id alors
      throw new Error("403:unauthorized request"); //Renvoie l'erreur
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error | "Requête non authentifiée" });
  }
};

export { auth };
// "DEVELOPMENT_TOKEN_SECRET"
