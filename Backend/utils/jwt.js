import jwt from "jsonwebtoken";

const Sign = "DEVELOPMENT_TOKEN_SECRET";

function generateToken(user, tokenSign) {
  return jwt.sign(
    {
      userId: user.id,
      isAdmin: user.isAdmin,
    },
    (tokenSign = "DEVELOPMENT_TOKEN_SECRET"),
    {
      expiresIn: "24h",
    }
  );
}
function getUserId(data, tokenSign) {
  if (data.length > 1) {
    let token = data.split(" ")[1];
    try {
      let decodedToken = jwt.verify(
        token,
        (tokenSign = "DEVELOPMENT_TOKEN_SECRET")
      );
      userId = decodedToken.userId;
      return userId;
    } catch (err) {
      return err;
    }
  }
}
export default { generateToken, getUserId };
