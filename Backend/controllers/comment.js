import { Comment } from "../models/Comment.js";
import { User } from "../models/user.js";

// Recupére tout les commentaires enregistré dans la base de donnée 
async function getAllComments(req, res) {
  try {
    const allComment = await Comment.findAll({
      where: {
        post_id: req.params.post_id,
      },
      include: [
        {
          model: User,
        },
      ],
      order: [["date", "ASC"]],
    });
    return res.status(200).json(allComment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, error: "post introuvable" });
  }
}
// Enregistre les informations de la creation de commentaire 
async function createPost(req, res) {
  try {
    const post = await Comment.create({
      user_id: req.body.user_id,
      content: req.body.content,
      post_id: req.body.post_id,
    });
    console.log(post);
    return res.status(201).json({ post, message: "Commentaire créé !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, error: "echec envoi commentaire" });
  }
}
export { getAllComments, createPost };
