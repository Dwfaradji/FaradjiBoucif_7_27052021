import jwt from "jsonwebtoken";

function generateToken(user, tokenSign) {
  return jwt.sign(
    {
      userId: user.id,
      isAdmin: user.isAdmin,
    },
    "DEVELOPMENT_TOKEN_SECRET",
    {
      expiresIn: "24h",
    }
  );
}
function getUserId(data, userId) {
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
