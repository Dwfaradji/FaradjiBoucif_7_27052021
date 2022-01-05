// 'use strict';
// export async function up(queryInterface, Sequelize) {
//   await queryInterface.createTable('Users', {
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.INTEGER
//     },
//     firstName: {
//       allowNull: false,
//       type: Sequelize.STRING
//     },
//     lastName: {
//       allowNull: false,
//       type: Sequelize.STRING
//     },
//     email: {
//       allowNull: false,
//       type: Sequelize.STRING
//     },
//     password: {
//       allowNull: false,
//       type: Sequelize.STRING
//     },
//     isAdmin: {
//       allowNull: false,
//       type: Sequelize.BOOLEAN
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
//   await queryInterface.dropTable('Users');
// }