// 'use strict';
// export async function up(queryInterface, Sequelize) {
//   await queryInterface.createTable('Comments', {
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.INTEGER
//     },
//     content: {
//       type: Sequelize.STRING
//     },
//     date: {
//       type: Sequelize.STRING
//     },
//     user_id: {
//       type: Sequelize.STRING
//     },
//     post_id: {
//       type: Sequelize.STRING
//     },
//     createdAt: {
//       allowNull: false,
//       type: Sequelize.DATE
//     },
//     updatedAt: {
//       allowNull: false,
//       type: Sequelize.DATE
//     }
//   });
// }
// export async function down(queryInterface, Sequelize) {
//   await queryInterface.dropTable('Comments');
// }