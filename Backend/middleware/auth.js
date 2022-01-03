import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // Si l'utilisateur possède une autorisation,
    // on déclare le token et on le vérifie, s'il n'y a pas
    // d'erreur, on le next, sinon on renvoie un statut 403
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'DEVELOPMENT_TOKEN_SECRET', (err, user) => {
            if (err) {
                return res.status(403);
            }
            next();
        });
    }
  } catch (err) {
    res.status(401).json({ error: "Accès non authorisé" });
    console.log(err, "erreur c'est pas toi");
  }
};

export { auth };

