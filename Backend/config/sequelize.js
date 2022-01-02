import { Sequelize } from "sequelize";
const database = new Sequelize("groupomania", "root", "7-Dj-NFR-s9R8r-cp5-5", {
  host: "localhost",
  dialect: "mysql",
});
export  {database};
