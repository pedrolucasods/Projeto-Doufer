'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('medidas_sob_medida',{
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            cliente_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'clientes',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            item_pedido_medida_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'item_pedido_medidas',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            busto: {
                type: Sequelize.STRING,
                allowNull: true
            },
            cintura: {
                type: Sequelize.STRING,
                allowNull: true
            },
            quadril: {
                type: Sequelize.STRING,
                allowNull: true
            },
            comprimento: {
                type: Sequelize.STRING,
                allowNull: true
            },
            ombro: {
                type: Sequelize.STRING,
                allowNull: true
            },
            costas: {
                type: Sequelize.STRING,
                allowNull: true
            },
            comprimento_da_manga: {
                type: Sequelize.STRING,
                allowNull: true
            },
            largura_da_manga: {
                type: Sequelize.STRING,
                allowNull: true
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

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('medidas_sob_medida')
    }
};
