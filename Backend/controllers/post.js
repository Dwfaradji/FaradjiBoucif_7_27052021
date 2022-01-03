// import { Post } from "../models/post.js";

// async function allPostWall(req, res) {
//   try {
//     const allPostWall = await Post.findAll();
//     res.status(200).json(allPostWall);
//     return;
//   } catch (error) {
//     res.status(500).json({ error:"erreur recherche all post" });
//   }
// }

// export { allPostWall };

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
