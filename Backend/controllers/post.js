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
        },
        {
          model: Comment,
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
async function deletePost(req, res, next) {
  try {
    await Post.destroy({ where: { user_id: 1 } });
    res.status(200).json({ message: "Post supprimé !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, error: "erreur suppression post" });
  }
}

// async function listMsg(req, res, next) {
//   try {
//   const allComments=  await Post.findAll({
//       include: [{
//           model: models.User,
//           attributes: ['username']
//       }],
//       order: [['createdAt', 'DESC']]
//   })
//   if (allComments.length > null) {
//     res.status(200).json(posts)
// } else {
//     res.status(404).json({ error: 'Pas de post à afficher' })
// }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error)
//   }
// }

export { createPost, getAllPosts, deletePost };
