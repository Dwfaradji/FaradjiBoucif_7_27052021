// "use strict";
// export async function up(queryInterface, Sequelize) {
//   await queryInterface.createTable("Posts", {
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.INTEGER,
//     },
//     idUser0: {
//       allowNull: false,
//       type: Sequelize.INTEGER,
//       references: {
//         model: "Users",
//         key: "id",
//       },
//     },
//     title: {
//       allowNull: false,
//       type: Sequelize.STRING,
//     },
//     content: {
//       allowNull: false,
//       type: Sequelize.STRING,
//     },
//     attachment: {
//       allowNull: true,
//       type: Sequelize.STRING,
//     },
//     likes: {
//       allowNull: false,
//       type: Sequelize.INTEGER,
//     },
//     createdAt: {
//       allowNull: false,
//       type: Sequelize.DATE,
//     },
//     updatedAt: {
//       allowNull: false,
//       type: Sequelize.DATE,
//     },
//   });
// }
// export async function down(queryInterface, Sequelize) {
//   await queryInterface.dropTable("Posts");
// }
