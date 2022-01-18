// Import
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
// Paramétre
const database = new Sequelize(
  "groupomania",
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Export
export { database };
