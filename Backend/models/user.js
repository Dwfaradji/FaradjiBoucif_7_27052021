"use strict";

import { DataTypes } from "sequelize";
import { database } from "../config/sequelize.js";

export const User = database.define("User", {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  isAdmin: DataTypes.BOOLEAN,
});

