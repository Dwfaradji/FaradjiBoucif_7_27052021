import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = (req.headers.authorization || "").split(" ")[1];
    req.token = jwt.verify(token, "DEVELOPMENT_TOKEN_SECRET");
    const userId = req.token.userId;
    if (req.body.userId && req.body.userId !== userId) {
      return res.status(401).json({ error:"Invalid user ID" });
    } else {
      next();
    }
  } catch {
    res.status(401).json({ error:"Accès non authorisé" });
  }
};

export { auth };

// import jwt from "jsonwebtoken";
// const auth = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization || "";
//     // Si l'utilisateur possède une autorisation,
//     // on déclare le token et on le vérifie, s'il n'y a pas
//     // d'erreur, on le next, sinon on renvoie un statut 403
//     if (authHeader) {
//       const token = authHeader.split(" ")[1];
//       jwt.verify(token, "DEVELOPMENT_TOKEN_SECRET", (err, user) => {
//         if (err) {
//           return res.status(403).json({ error: "erreur authentification" });
//         }
//         next();
//       });
//     }
//     // Sinon, on renvoie le statut 401 Unauthorized
//   } catch {
//     res.status(401).json({ error: "accès non authorisé" });
//   }
// };

// export { auth };
