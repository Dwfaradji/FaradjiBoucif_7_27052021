import { Post } from "../models/post.js";
import { User } from "../models/user.js";
import { Comment } from "../models/Comment.js";

// Creation d'un post
async function createPost(req, res) {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
      likes: req.body.likes,
    });
    console.log(post);
    return res.status(201).json({ post, message: "Post créé !" });
  } catch (error) {
    res.status(400).json({ error, error: "erreur de creation de post" });
    console.log(error);
  }
}
// Recupération de tout les posts enregistrer dans la base de données
async function getAllPosts(req, res) {
  try {
    const allPostWall = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "email"],
        },
        {
          model: Comment,
          attributes: ["content","user_id"],
          separate: true,
          order: [["id", "ASC"]],
        },
      ],
      order: [["id", "DESC"]],
    });
    res.status(200).json(allPostWall);
  } catch (error) {
    res.status(400).json({ error, error: "erreur de récupération des posts" });
    console.log(error);
  }
}
async function deletePost(req, res, next) {
  try {
    await Post.destroy({
      where: { id: req.body.id },
    });
    res.status(200).json({ message: "Post supprimé !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, error: "erreur suppression post" });
  }
}


export { createPost, getAllPosts, deletePost };
