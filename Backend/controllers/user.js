import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import passwordValidator from "./password_validation.js";
import { user } from "../models/user.js";

async function signup(req, res) {
  //   const passwordIsValid = passwordValidator.validate(req.body.password);
  //   if (!passwordIsValid) {
  //     return res.status(400).json({ message: "Mot de passe invalide" });
  //   }
  // firstName: null,
  //         lastName: null,
  //         email: null,
  //         password: null,
  //         confirmPassword: null,

  if (!req.body.email || !req.body.password) {
    return res.status(400);
  }
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const userSave = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordHash,
    });
    await userSave.save();
    res.status(201).json({ message: "Utilisateur crée" });
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function login(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400);
  }
  try {
    const userEmail = await user.findOne({ email: req.body.email });
    if (!userEmail) {
      return res
        .status(401)
        .json({ error: "Utilisateur ou Mot de passe incorrect !" });
    }
    const passwordValid = await bcrypt.compare(
      req.body.password,
      userEmail.password
    );
    if (!passwordValid) {
      return res
        .status(401)
        .json({ error: "Utilisateur ou Mot de passe incorrect !" });
    } else {
      res.status(200).json({
        userId: userEmail._id,
        token: jwt.sign({ userId: userEmail._id }, "TOKEN_SECRET", {
          expiresIn: "24h",
        }),
      });
      console.log("ok");
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export { login, signup };
