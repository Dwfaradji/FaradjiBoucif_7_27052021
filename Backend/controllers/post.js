import { Post } from "../models/post.js";
import { User } from "../models/user.js";

async function createPost(req, res) {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
    });
    console.log(post);
    return res.status(201).json({ post, message: "Post créé !" });
  } catch (error) {
    res.status(400).json({ error, error: "erreur envoie post" });
    console.log(error);
  }
}

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
    res.status(400).json({ error, error: "erreur recherche all post" });
    console.log(error);
  }
}

export { createPost, getAllPosts };
