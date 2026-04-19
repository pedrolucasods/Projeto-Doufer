'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('clientes', 'nome_empresa',{
            type: Sequelize.STRING,
            allowNull: false
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('clientes','nome_empresa')
    }
};
