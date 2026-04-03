'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pagamento',{
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      pedido_id:{
        type: Sequelize.INTEGER,
        references:{
          model:'pedidos',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      valor:{
        type: Sequelize.FLOAT,
        allowNull: false
      },
      forma_pagamento:{
        type: Sequelize.STRING,
        allowNull: false
      },
      data_pagamento:{
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      createdAt:{
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt:{
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pagamento')
  }
};
