"use strict";

import { DataTypes } from "sequelize";
import { database } from "../config/sequelize.js";
import { Post } from "../models/post.js";


export const User = database.define("User", {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  // image: DataTypes.STRING,
  isAdmin: DataTypes.BOOLEAN,
});

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Post.belongsTo(User, { foreignKey: "user_id" });

