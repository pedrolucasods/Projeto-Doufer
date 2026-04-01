'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('pedidos', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            cliente_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'clientes',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            data: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('aberto', 'finalizado', 'cancelado'),
                allowNull: false
            }
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('pedidos')
    }
};
