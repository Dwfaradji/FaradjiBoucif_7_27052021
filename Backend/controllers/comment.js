// Import
import { Comment } from "../models/comment.js";
import { User } from "../models/user.js";
import jwt from "../utils/jwt.js";

// Route
async function createComment(req, res) {
  // Enregistre les informations de la creation de commentaire
  try {
    //Paramètre
    const comment = await Comment.create({
      user_id: req.body.user_id,
      content: req.body.content,
      post_id: req.body.post_id,
      // firstName: req.body.firstName,
    });
    return res.status(201).json({ id: comment, message: "Commentaire créé !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, error: "echec envoi commentaire" });
  }
}

async function getAllComments(req, res) {
  // Recupére tout les commentaires enregistré dans la base de donnée
  try {
    //Paramètre
    const allComment = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName"],
        },
      ],
    });
    return res.status(200).json(allComment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, error: "Commentaire introuvable" });
  }
}

async function getOneComment(req, res) {
  // Recupére un commentaire enregistré dans la base de donnée
  try {
    //Paramètre
    const comment = await Comment.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, error: "Commentaire introuvable" });
  }
}

async function deleteComment(req, res) {
  // Recupére un commentaire enregistré dans la base de donnée pour le supprimer
  let idUserStore = jwt.getUserId(req.headers.authorization);
  const userIdComments = req.params.id;
  console.log(idUserStore, "id params local storage");
  try {
    //Paramètre
    const commentFind = await Comment.findOne({ where: { id: req.params.id } });
    const userFindComment = commentFind.user_id;
    console.log(commentFind.user_id, "JE SUIS USER ID DU POST");
    if (idUserStore !== userFindComment) {
      res
        .status(400)
        .send({ message: "Vous n'êtes pas autorisé a supprimez ce post!" });
    } else {
      await Comment.destroy({
        where: { id: userIdComments },
      });
      res.status(200).json({ message: "Post supprimé !" });
    }
    return res.status(200).json({ message: "Commentaire supprimé !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, error: "Commentaire nom supprimer" });
  }
}

// Exportation
export { getAllComments, createComment, getOneComment, deleteComment };
