// Imports
import { Post } from "../models/post.js";
import { User } from "../models/user.js";
import { Comment } from "../models/comment.js";
import jwt from "../utils/jwt.js";

// Routes
async function createPost(req, res) {
  // Enregistre les informations de la creation d'un post
  try {
    //Paramètre
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
    });
    return res.status(201).json({ post, message: "Post créé !" });
  } catch (error) {
    res.status(400).json({ error, error: "erreur de creation de post" });
    console.log(error);
  }
}

async function getAllPosts(req, res) {
  // Recupération de tout les posts enregistrer dans la base de données
  try {
    //Paramètre
    const allPostWall = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "isAdmin"],
        },
        {
          model: Comment,
          separate: true,
          order: [["id", "ASC"]],
          include: [User],
        },
      ],
      order: [["id", "DESC"]],
    });
    return res.status(200).json(allPostWall);
  } catch (error) {
    res.status(400).json({ error, error: "erreur de récupération des posts" });
    console.log(error);
  }
}

async function deletePost(req, res, next) {
  // Supprime le post enregistrer dans la base de données
  let idUserStore = jwt.getUserId(req.headers.authorization);
  const userIdPost = req.params.id;
  try {
    //Paramètre
    const postFind = await Post.findOne({
      where: { id: req.params.id },
      include: [{ model: User, attributes: ["isAdmin"] }],
    });
    const userFindPost = postFind.user_id;
    //Cherche si admin ou pas
    const adminFind = await User.findOne({
      attributes: ["id", "email", "isAdmin"],
      where: { id: idUserStore },
    });
    const isAdmin = adminFind.isAdmin;

    if (isAdmin == true || idUserStore == userFindPost) {
      await Post.destroy({
        where: { id: userIdPost },
      });
      res.status(200).json({ message: "Post supprimé !" });
    } else {
      res
      .status(400)
      .send({ message: "Vous n'êtes pas autorisé a supprimez ce post!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, error: "erreur suppression post" });
  }
}
// Exportation
export { createPost, getAllPosts, deletePost };
