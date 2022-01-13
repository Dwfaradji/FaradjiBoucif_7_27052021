"use strict";
import { DataTypes } from "sequelize";
import { database } from "../config/sequelize.js";
import { Comment } from "../models/comment.js";
// import { User } from "../models/user.js";

export const Post = database.define("Post", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  date: DataTypes.DATE,
  attachment: DataTypes.STRING,

  //   likes: DataTypes.STRING,
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Comment.belongsTo(Post, { foreignKey: "post_id" });
