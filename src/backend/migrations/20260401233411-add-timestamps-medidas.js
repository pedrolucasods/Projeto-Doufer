'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('medidas_clientes', 'createdAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        })

        await queryInterface.addColumn('medidas_clientes', 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('medidas_clientes', 'createdAt')
        await queryInterface.removeColumn('medidas_clientes', 'updatedAt')
    }
};
