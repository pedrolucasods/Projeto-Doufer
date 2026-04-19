'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("item_pedido_medidas", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                allowNull:false
            },
            item_pedido_id: {
                type: Sequelize.INTEGER,
                references:{
                    model:"itens_pedidos",
                    key:"id"
                },
                onDelete:"CASCADe"
            },
            tipo_medida:{
                type: Sequelize.ENUM('padrao', 'sob_medida'),
                allowNull: false
            },
            quantidade:{
                type: Sequelize.INTEGER
            },
            createdAt:{
                type: Sequelize.DATE,
                allowNull:false,
                defaultValue: Sequelize.NOW
            },
            updatedAt:{
                type: Sequelize.DATE,
                allowNull:false,
                defaultValue: Sequelize.NOW
            }
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("item_pedido_medidas")
    }
};
