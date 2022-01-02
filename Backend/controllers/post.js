import { Post } from "../models/post.js";

async function allPostWall(req, res) {
  try {
    const allPostWall = await Post.findAll();
    res.status(200).json(allPostWall);
    return;
  } catch (error) {
    res.status(500).json({ error:"erreur recherche all post" });
  }
}

async function createPost(req, res) {
  Post.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.body.idUser,
  })
    .then(() => res.status(201).json({ message: "Post créé !" }))
    .catch((error) => res.status(400).json({ error:"erreur creation de post" }));
}
export { allPostWall, createPost };

// exports.listMsg = (req, res) => {
//     models.Post.findAll({
//         include: [{
//             model: models.User,
//             attributes: ['username']
//         }],
//         order: [['createdAt', 'DESC']]
//     })
//         .then(posts => {
//             if (posts.length > null) {
//                 res.status(200).json(posts)
//             } else {
//                 res.status(404).json({ error: 'Pas de post à afficher' })
//             }
//         })
//         .catch(err => res.status(500).json(err))
// }
