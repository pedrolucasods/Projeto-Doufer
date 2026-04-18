'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('medidas_padrao',{
            id:{
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            cliente_id:{
                type: Sequelize.INTEGER,
                references:{
                    model: 'clientes',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                allowNull: true
            },
            item_pedido_medida_id:{
                type: Sequelize.INTEGER,
                references:{
                    model: 'item_pedido_medidas',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                allowNull: true
            },
            tamanho:{
                type: Sequelize.STRING,
                allowNull: false
            },
            ajuste:{
                type: Sequelize.TEXT,
                allowNull: true
            },
            createdAt:{
                type: Sequelize.DATE,
                allowNull:false,
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
        queryInterface.dropTable('medidas_padrao')
    }
};
