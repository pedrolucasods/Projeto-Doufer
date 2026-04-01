'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('itens_pedidos', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			id_pedido: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references:{
					model:'pedidos',
					key:'id'
				},
				onDelete: "CASCADE"
			},
			preco: {
				type: Sequelize.FLOAT
			},
			produto: {
				type: Sequelize.STRING
			},
			cor: {
				type: Sequelize.STRING
			},
			tecido: {
				type: Sequelize.STRING
			},
			tamanho: {
				type: Sequelize.STRING
			},
			detalhes: {
				type: Sequelize.STRING
			},
			quantidade: {
				type: Sequelize.INTEGER
			},
			preco_unitario: {
				type: Sequelize.FLOAT
			},
			modelo_produto: {
				type: Sequelize.STRING
			},
			complemento: {
				type: Sequelize.STRING
			}
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('itens_pedidos')
	}
};
