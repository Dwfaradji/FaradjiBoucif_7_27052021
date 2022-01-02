import {Comment} from "../models/Comment.js";

async function allPostWall(req, res) {
  try {
    const allPostWall = await Comment.findOne();
    res.status(200).json(allPostWall);
    return;
  } catch (error) {
    res.status(500).json({ error,error:"post introuvable" });
  }
}


async function createPost  (req, res) {
	Comment.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.body.idUser
})
.then(() => res.status(201).json({message: 'Post créé !'}))
.catch( error => res.status(400).json({error}));
    
}
export { allPostWall, createPost };