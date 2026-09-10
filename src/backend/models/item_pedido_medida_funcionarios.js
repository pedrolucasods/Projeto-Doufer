const db = require('../database')
const {DataTypes} = require('sequelize')

const ItemPedidoMedidaFuncionario = db.define('item_pedido_medida_funcionarios',{
    item_pedido_medida_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'item_pedido_medidas',
            key: "id"
        },
        onDelete: "CASCADE"
    },
    funcionario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'funcionarios',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    medida_padrao_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'medidas_padrao',
            key: "id"
        },
        onDelete: "CASCADE"
    },
    medida_sob_medida_feminina_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'medida_sob_medida_femininas',
            key: "id"
        },
        onDelete: "CASCADE"
    },
    medida_sob_medida_masculina_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'medida_sob_medida_masculinas',
            key: "id"
        },
        onDelete: "CASCADE"
    }
})

module.exports = ItemPedidoMedidaFuncionario