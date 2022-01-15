// Imports
import bcrypt from "bcrypt";
import passwordValidator from "password-validator";
import emailValidator from "email-validator";
import { User } from "../models/user.js";
import verifInput from "../utils/verifInput.js";
import jwt from "../utils/jwt.js";

// Variables
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

// Routes
async function signup(req, res, next) {
  // Enregistre les informations de l'utilisateur dans la base de données
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
  //Vérification des saisies user
  let emailOk = verifInput.validEmail(email);
  let mdpOK = verifInput.validPassword(password);
  let firstNameOk = verifInput.validUsername(firstName);
  let lastNameOk = verifInput.validUsername(lastName);

  try {
    //Paramètre
    if (
      emailOk == true &&
      mdpOK == true &&
      firstNameOk == true &&
      lastNameOk == true
    ) {
      // Vérification de l 'existance de cet email dans la base de donnée utilisateurs
      const verifUser = await User.findOne({
        attributes: ["email"],
        where: { email: email },
      });
      // hash du password avec bcript :
      if (!verifUser) {
        const criptPasseword = await bcrypt.hash(req.body.password, 10);
        // Lancement de la création de l'utilisateur
        const newUser = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: criptPasseword,
          // image: `${req.protocol}://${req.get("host")}/images/${
          //   req.file.filename
          // }`,
          isAdmin: 0,
        });
        res
          .status(201)
          .json({ id: newUser.post_id, message: "Utilisateur créer" });
      } else {
        res.status(409).json({ error: "Cette utilisateur existe déjà " });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, error: "probléme inscription est survenue" });
  }
}
// // ----------------------------------------------------------------------/
// //       script pour le login
// // ----------------------------------------------------------------------/

async function login(req, res) {
  // Récupération les informations de l'utilisateur enregistré dans la base de données
  let userEmail = req.body.email;
  let password = req.body.password;
  if (!userEmail || !password) {
    return res.status(400).json({ error: "Il manque un paramètre" });
  }
  try {
    // Paramètre
    const userName = await User.findOne({ where: { email: userEmail } });
    // Recherche d'une entrée dans la base en fonction de l'email
    if (!userName) {
      return res.status(401).json({ error: "Utilisateur  incorrect !" });
    }
    // Lancement de la vérification du mot de passe
    const passwordValid = await bcrypt.compare(password, userName.password);
    if (!passwordValid) {
      return res.status(401).json({ error: " Mot de passe incorrect !" });
    } else {
      // Génere les informations tell que userId et le token
      res.status(200).json({
        userId: userName.id,
        token: jwt.generateToken(userName),
        isAdmin: userName.isAdmin,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error, error: "erreur identification" });
  }
}

async function userInfos(req, res) {
  // Récupère les informations de l'utilisateur  aprés identification
  try {
    let userId = jwt.getUserId(req.headers.authorization);
    // Paramètre
    const user = await User.findOne({
      attributes: ["id", "email", "firstName", "lastName", "image", "isAdmin"],
      where: { id: userId },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: "error user" });
    }
  } catch (error) {
    res.status(500).json({ error, erreur: "erreur serveur infos user" });
  }
}
async function deleteUser(req, res, next) {
  // Supprime l'utilisateur enregistrer dans la base de données
  try {
    //Paramètre
    await User.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Utilisateur supprimé !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, error: "erreur suppression Utilisateur" });
  }
}

async function updatePicture(req, res) {
  // Enregistre l'image choisi par l'utilisateur dans la base de données
  try {
    // Paramètre
    if (req.file) {
      console.log(req.file);
      res.status(201).json({ message: "Image téléchargé avec succés " });
    } else {
      res.status(500).json({ message: "Image non téléchargé" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
// Exportation
export { login, signup, userInfos, deleteUser, updatePicture };
