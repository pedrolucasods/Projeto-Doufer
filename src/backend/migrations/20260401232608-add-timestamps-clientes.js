'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('clientes', 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        })

        await queryInterface.addColumn('clientes', 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('clientes', 'createdAt')
        await queryInterface.removeColumn('clientes', 'updatedAt')
    }
};
