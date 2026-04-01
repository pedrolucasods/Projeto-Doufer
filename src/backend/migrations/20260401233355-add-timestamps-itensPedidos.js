'use strict';

const { QueryError } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('itens_pedidos', 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        })

        await queryInterface.addColumn('itens_pedidos', 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('itens_pedidos', 'createdAt')
        await queryInterface.removeColumn('itens_pedidos', 'updatedAt')
    }
};
