'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("medida_sob_medida_masculinas", {
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
                    key: "id"
                },
                onDelete: "CASCADE"
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
            funcionario_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'funcionarios',
                    key: "id"
                },
                onDelete: "CASCADE"
            },
            ombro:{
                type:Sequelize.STRING,
                allowNull:true
            },
            circunferencia_torax:{
                type:Sequelize.STRING,
                allowNull:true
            },
            circunferencia_abdomen:{
                type:Sequelize.STRING,
                allowNull:true
            },
            costa:{
                type:Sequelize.STRING,
                allowNull:true
            },
            comprimento_manga:{
                type:Sequelize.STRING,
                allowNull:true
            },
            largura_punho:{
                type:Sequelize.STRING,
                allowNull:true
            },
            largura_manga:{
                type:Sequelize.STRING,
                allowNull:true
            },
            comprimento_corpo:{
                type:Sequelize.STRING,
                allowNull:true
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
        await queryInterface.dropTable("medida_sob_medida_masculinas")
    }
};
