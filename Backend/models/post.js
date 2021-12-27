//Importer Mongoose
import mongoose from "mongoose";

//Crée le schéma de donnée

const postShema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    maxLength: 250,
    trim: true,
  },
  imageUrl: { type: String, required: true },

  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
  userId: { type: String, required: true },
});

const postModel2 = mongoose.model("post", postShema);

export default postModel2;
