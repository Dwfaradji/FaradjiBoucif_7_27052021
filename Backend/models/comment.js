"use strict";

import { DataTypes } from "sequelize";
import { database } from "../config/sequelize.js";
import { Post } from "../models/post.js";
export const Comment = database.define("Comment", {
  // id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: DataTypes.STRING,
  date: DataTypes.DATE,
  user_id: DataTypes.SMALLINT,
  post_id: DataTypes.SMALLINT,
});
