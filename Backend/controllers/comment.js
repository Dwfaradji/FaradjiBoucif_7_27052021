import { Comment } from "../models/Comment.js";
import { User } from "../models/user.js";
import { Post } from "../models/post.js";

// Enregistre les informations de la creation de commentaire
async function createComment(req, res) {
  try {
    const post = await Comment.create({
      user_id: req.body.user_id,
      content: req.body.content,
      post_id: req.body.post_id,
    });
    console.log(post.post_id, " TEST ");
    return res.status(201).json({ id: post, message: "Commentaire créé !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, error: "echec envoi commentaire" });
  }
}
// Recupére tout les commentaires enregistré dans la base de donnée
async function getAllComments(req, res) {
  try {
    const allComment = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName"],
        },
      ],
      order: [["date", "ASC"]],
    });

    return res.status(200).json(allComment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, error: "Commentaire introuvable" });
  }
}

async function getOneComment(req, res) {
  try {
    const comment = await Comment.findOne({
      where: {
        id: req.params.id, // @_TODO problème pour recuperer le commentaire
      },
    });
    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, error: "Commentaire introuvable" });
  }
}

export { getAllComments, createComment, getOneComment };
