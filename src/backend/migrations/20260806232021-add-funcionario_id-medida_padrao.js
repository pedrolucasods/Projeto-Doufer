'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("medidas_padrao", "funcionario_id",{
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'funcionarios',
                key: "id"
            },
            onDelete: "CASCADE"
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("medidas_padrao","funcionario_id")
    }
};
