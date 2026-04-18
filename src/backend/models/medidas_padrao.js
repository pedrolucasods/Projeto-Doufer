const db = require('../database')
const { DataTypes } = require('sequelize')

const Medidas_padrao = db.define('medidas_padrao', {
    cliente_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes',
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: true
    },
    item_pedido_medida_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'item_pedido_medidas',
            key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: true
    },
    tamanho: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ajuste: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

module.exports = Medidas_padrao