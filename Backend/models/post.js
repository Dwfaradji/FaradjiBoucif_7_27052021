"use strict";
// Import
import { DataTypes } from "sequelize";
import { database } from "../config/sequelize.js";
import { Comment } from "../models/comment.js";

// Modèle
export const Post = database.define("Post", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  date: DataTypes.DATE,
  attachment: DataTypes.STRING,
});

// Association
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Comment.belongsTo(Post, { foreignKey: "post_id" });

//  User.belongsTo(Post, { foreignKey: "firstName" });
//  Comment.belongsTo(Post, { foreignKey: "firstName" });
