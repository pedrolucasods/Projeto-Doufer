const db = require('../database')
const { DataTypes } = require('sequelize')

const Medidas_sob_medida = db.define('medidas_sob_medidas', {
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'clientes',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    item_pedido_medida_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'item_pedido_medidas',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    busto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cintura: {
        type: DataTypes.STRING,
        allowNull: true
    },
    quadril: {
        type: DataTypes.STRING,
        allowNull: true
    },
    comprimento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ombro: {
        type: DataTypes.STRING,
        allowNull: true
    },
    costas: {
        type: DataTypes.STRING,
        allowNull: true
    },
    comprimento_da_manga: {
        type: DataTypes.STRING,
        allowNull: true
    },
    largura_da_manga: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Medidas_sob_medida