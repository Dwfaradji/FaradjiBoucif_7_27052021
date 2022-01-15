"use strict";
// Import
import { DataTypes } from "sequelize";
import { database } from "../config/sequelize.js";
import { Post } from "../models/post.js";
import { Comment } from "../models/comment.js";

// Modèle
export const User = database.define("User", {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAdmin: DataTypes.BOOLEAN,
});

// Association
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Post.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Comment.belongsTo(User, { foreignKey: "user_id" });
