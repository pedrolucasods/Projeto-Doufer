'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('medidas_padrao','sexo',{
      type: Sequelize.ENUM('masculino','feminino'),
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('medidas_padrao','sexo')
  }
};
