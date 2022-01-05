"use strict";
import { DataTypes } from "sequelize";
import { database } from "../config/sequelize.js";

export const Post = database.define("Post", {
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  date: DataTypes.DATE,
  attachment: DataTypes.STRING,
  user_id: DataTypes.STRING,

});
