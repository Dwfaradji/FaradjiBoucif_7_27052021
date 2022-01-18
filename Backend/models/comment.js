"use strict";
// Imports
import { DataTypes } from "sequelize";
import { database } from "../config/sequelize.js";

//Modèle
export const Comment = database.define("Comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: DataTypes.STRING,
});
