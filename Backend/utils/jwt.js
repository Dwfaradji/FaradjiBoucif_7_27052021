// Import
import jwt from "jsonwebtoken";

// Routes identification
function generateToken(user, tokenSign) {
  // Génere le token d'authentification
  return jwt.sign(
    {
      userId: user.id,
      isAdmin: user.isAdmin,
    },
    // Token secret
    "DEVELOPMENT_TOKEN_SECRET",
    {
      expiresIn: "24h",
    }
  );
}

function getUserId(data, userId) {
  // Récupere le token reçu et les compares
  if (data.length > 1) {
    let token = data.split(" ")[1];
    try {
      let decodedToken = jwt.verify(token, "DEVELOPMENT_TOKEN_SECRET");
      userId = decodedToken.userId;
      return userId;
    } catch (err) {
      return console.log(err, "KO");
    }
  }
}

export default { generateToken, getUserId };
