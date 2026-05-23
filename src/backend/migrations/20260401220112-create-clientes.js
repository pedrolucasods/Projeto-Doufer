'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('clientes', {

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            telefone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            cpf: {
                type: Sequelize.STRING,
                allowNull: false
            },
            tipo_cliente: {
                type: Sequelize.ENUM(
                    'pessoa',
                    'empresa'
                ),
                allowNull: true
            }
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('clientes')
    }
};
