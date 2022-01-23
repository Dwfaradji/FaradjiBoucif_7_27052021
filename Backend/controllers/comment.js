// Import
import { Comment } from "../models/comment.js";
import jwt from "../utils/jwt.js";

// Route
async function createComment(req, res) {
  // Enregistre les informations de la creation de commentaire
  try {
    //Paramètre
    if (req.body.content !== "") {
      const comment = await Comment.create({
        user_id: req.user.userId,
        content: req.body.content,
        post_id: req.body.post_id,
      });
      return res
        .status(201)
        .json({ id: comment, message: "Commentaire créé !" });
    } else {
      res.status(401).json({ error: "il y a pas de commentaire" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "echec envoi commentaire" });
  }
}
// Routes
async function deleteComment(req, res) {
  // Recupére un commentaire enregistré dans la base de donnée pour le supprimer
  let idUserStore = jwt.getUserId(req.headers.authorization);
  const userIdComments = req.params.id;
  try {
    //Paramètre
    //Controle Administrateur
    const isAdmin = req.user.isAdmin;
    const commentFind = await Comment.findOne({ where: { id: req.params.id } });
    const userFindComment = commentFind.user_id;
    if (isAdmin == true || idUserStore == userFindComment) {
      await Comment.destroy({
        where: { id: userIdComments },
      });
      res.status(200).json({ message: "Commentaire supprimé !" });
    } else {
      res.status(403).send({
        message: "Vous n'êtes pas autorisé a supprimez ce Commentaire!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Commentaire nom supprimer" });
  }
}

// Exportation
export { createComment, deleteComment };
