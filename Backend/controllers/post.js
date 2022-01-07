import { Post } from "../models/post.js";
import { User } from "../models/user.js";



// Creation d'un post 
async function createPost(req, res) {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      idUser: req.body.idUser,
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
        },
      ],
      order: [["id", "DESC"]],
    });
    console.log(allPostWall);
    res.status(200).json(allPostWall);
  } catch (error) {
    res.status(400).json({ error, error: "erreur de récupération des posts" });
    console.log(error);
  }
}

export { createPost, getAllPosts };
