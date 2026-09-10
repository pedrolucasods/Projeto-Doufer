'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("item_pedido_medida_funcionarios", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            item_pedido_medida_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'item_pedido_medidas',
                    key: "id"
                },
                onDelete: "CASCADE"
            },
            funcionario_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'funcionarios',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            medida_padrao_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'medidas_padrao',
                    key: "id"
                },
                onDelete: "CASCADE"
            },
            medida_sob_medida_feminina_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'medida_sob_medida_femininas',
                    key: "id"
                },
                onDelete: "CASCADE"
            },
            medida_sob_medida_masculina_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'medida_sob_medida_masculinas',
                    key: "id"
                },
                onDelete: "CASCADE"
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW
            }
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("item_pedido_medida_funcionarios")
    }
};
