import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = (req.headers.authorization || "").split(" ")[1]; 
    req.token = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = req.token.userId;
    if (req.body.userId && req.body.userId !== userId) {
      return res.status(401).json({ message: "Invalid user ID" });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};

export { auth };
