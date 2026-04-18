const db = require('../database')
const { DataTypes } = require('sequelize')

const Item_pedido_medida = db.define('item_pedido_medidas', {
    item_pedido_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "itens_pedidos",
            key: "id"
        },
        onDelete: "CASCADe"
    },
    tipo_medida: {
        type: DataTypes.ENUM('padrao', 'sob_medida'),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER
    }
})

module.exports = Item_pedido_medida