"use strict";

import { DataTypes } from "sequelize";
import { database } from "../config/sequelize.js";

export const Comment = database.define("Comment", {
  content: DataTypes.STRING,
  date: DataTypes.DATE,
  user_id: DataTypes.SMALLINT,
  post_id: DataTypes.STRING,
});
