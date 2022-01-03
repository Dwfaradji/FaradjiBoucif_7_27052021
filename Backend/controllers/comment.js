import { Comment } from "../models/Comment.js";

async function allPostWall(req, res) {
  try {
    const allPostWall = await Comment.findOne();
    return res.status(200).json(allPostWall);
  } catch (error) {
    res.status(500).json({ error, error: "post introuvable" });
  }
}

async function createPost(req, res) {
  try {
    const post = await Comment.create({
      title: req.body.title,
      content: req.body.content,
      post_id: req.body.post_id,
    });
	console.log(post);
    return res.status(201).json({ post, message: "Post créé !" });
  } catch (error) {
    res.status(400).json({ error, error: "echec post" });
  }
}
export { allPostWall, createPost };
