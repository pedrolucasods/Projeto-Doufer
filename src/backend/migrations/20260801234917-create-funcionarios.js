'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("funcionarios",{
      id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      cliente_id:{
        type:Sequelize.INTEGER,
        references:{
          model:'clientes',
          key:"id"
        },
        onDelete: "CASCADE"
      },
      nome:{
        type:Sequelize.STRING,
        allowNull:false
      },
      telefone:{
        type:Sequelize.STRING,
        allowNull:true
      },
      createdAt:{
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
      },
      updatedAt:{
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("funcionarios")
  }
};
