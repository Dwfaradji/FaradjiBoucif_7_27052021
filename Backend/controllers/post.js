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
          attributes: ["content"],
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

      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Post supprimé !" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error, error: "erreur suppression post" });
  }
}
//Suppression d'un post
// exports.delete = (req, res) => {
//     //req => userId, postId, user.isAdmin
//     let userOrder = req.body.userIdOrder;
//     //identification du demandeur
//     let id = utils.getUserId(req.headers.authorization)
//     models.User.findOne({
//         attributes: ['id', 'email', 'username', 'isAdmin'],
//         where: { id: id }
//     })
//         .then(user => {
//             //Vérification que le demandeur est soit l'admin soit le poster (vérif aussi sur le front)
//             if (user && (user.isAdmin == true || user.id == userOrder)) {
//                 console.log('Suppression du post id :', req.body.postId);
//                 models.Post
//                     .findOne({
//                         where: { id: req.body.postId }
//                     })
//                     .then((postFind) => {

//                         if (postFind.attachement) {
//                             const filename = postFind.attachement.split('/images/')[1];
//                             console.log("teseeeest", filename);
//                             fs.unlink(`images/${filename}`, () => {
//                                 models.Post
//                                     .destroy({
//                                         where: { id: postFind.id }
//                                     })
//                                     .then(() => res.end())
//                                     .catch(err => res.status(500).json(err))
//                             })
//                         }
//                         else {
//                             models.Post
//                                 .destroy({
//                                     where: { id: postFind.id }
//                                 })
//                                 .then(() => res.end())
//                                 .catch(err => res.status(500).json(err))
//                         }
//                     })
//                     .catch(err => res.status(500).json(err))
//             } else { res.status(403).json('Utilisateur non autorisé à supprimer ce post') }
//         })
//         .catch(error => res.status(500).json(error));
// };

export { createPost, getAllPosts, deletePost };
