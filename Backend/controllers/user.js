import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passwordValidator from "password-validator";
import emailValidator from "email-validator";
import user from "../models/user.js";

const schema = new passwordValidator();
schema
  .is()
  .min(3)
  .is()
  .max(50)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1);

async function signup(req, res, next) {
  if (!emailValidator.validate(req.body.email)) {
    return res
      .status(401)
      .json({ message: "Veuillez entrer une adresse email valide" });
  }

  if (!schema.validate(req.body.password)) {
    return res.status(401).json({
      message:
        "Le mot de passe doit avoir une longueur de 3 à 50 caractères avec au moins un chiffre, une minuscule, une majuscule !!!",
    });
  }
  try {
    const criptPasseword = bcrypt.hash(req.body.password, 10);
    const newUser =  user.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: criptPasseword,
      isAdmin: 0,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error });
  }
}
//=====================================================================
//====================================================================
async function login(req, res) {
  if (!req.body.email || !req.body.password) {
    return res.status(400);
  }
  try {
    const userEmail = await models.findOne({ email: req.body.email });
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
