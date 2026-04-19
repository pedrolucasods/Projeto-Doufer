const db = require('../database')
const { DataTypes } = require('sequelize')

const Pagamento = db.define('pagamento', {
    pedido_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'pedidos',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    forma_pagamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_pagamento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
})

module.exports = Pagamento