import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import passwordValidator from "password-validator";
import emailValidator from "email-validator";
import { User } from "../models/user.js";
import verifInput from "../utils/verifInput.js";
import jwt from "../utils/jwt.js";
const schemaPassword = new passwordValidator();
schemaPassword
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
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let password = req.body.password;
  // Valider les paramètres de la requète
  if (!emailValidator.validate(email)) {
    return res
      .status(401)
      .json({ message: "Veuillez entrer une adresse email valide" });
  }

  if (!schemaPassword.validate(password)) {
    return res.status(401).json({
      message:
        "Le mot de passe doit avoir une longueur de 3 à 50 caractères avec au moins un chiffre, une minuscule, une majuscule !!!",
    });
  }

  if (
    email == null ||
    firstName == null ||
    lastName == null ||
    password == null
  ) {
    res.status(400).json({ error: "il manque un paramètre" });
  }
  //TO DO => Vérification des saisies user
  let emailOk = verifInput.validEmail(email);
  console.log(emailOk);
  let mdpOK = verifInput.validPassword(password);
  console.log(mdpOK);
  let firstNameOk = verifInput.validUsername(firstName);
  console.log(firstNameOk);
  let lastNameOk = verifInput.validUsername(lastName);
  console.log(lastNameOk);

  try {
    if (
      emailOk == true &&
      mdpOK == true &&
      firstNameOk == true &&
      lastNameOk == true
    ) {
      const verifUser = await User.findOne({
        attributes: ["email"],
        where: { email: email },
      });
      console.log(verifUser, "salut OK");
      if (!verifUser) {
        const criptPasseword = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: criptPasseword,
          isAdmin: 0,
        });
        res.status(201).json({ id: newUser.id, message: "Utilisateur créer" });
      } else {
        res.status(409).json({ error: "Cette utilisateur existe déjà " });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, error: "probléme inscription est survenue" });
  }
}
//=====================================================================
//====================================================================
async function login(req, res) {
  let userEmail = req.body.email;
  let password = req.body.password;

  if (!userEmail || !password) {
    return res.status(400).json({ error: "Il manque un paramètre" });
  }
  try {
    const userName = await User.findOne({ where: { email: userEmail } });
    if (!userName) {
      return res.status(401).json({ error: "Utilisateur  incorrect !" });
    }
    const passwordValid = await bcrypt.compare(password, userName.password);
    if (!passwordValid) {
      return res.status(401).json({ error: " Mot de passe incorrect !" });
    } else {
      res.status(200).json({
        userId: userName.id,
        token: jwt.generateToken(userName),
        isAdmin: userName.isAdmin,
      });
      console.log(jwt,"ok");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, error: "erreur identification" });
  }
}

async function userInfos(req, res) {
  try {
    let userId = jwt.getUserId(req.headers.authorization);
    const user = await User.findOne({
      attributes: ["id", "email", "firstName", "lastName", "isAdmin"],
      where: { id: userId },
    });
    console.log(user, "c'est les infos user");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: "error user" });
    }
  } catch (error) {
    res.status(500).json({ error, erreur: "erreur serveur infos user" });
  }
}

export { login, signup, userInfos };
