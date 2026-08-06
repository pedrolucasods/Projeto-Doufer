const db = require('../database')
const { DataTypes } = require('sequelize')

const Medida_sob_medida_masculinas = db.define('medida_sob_medida_masculinas', {
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'clientes',
            key: "id"
        },
        onDelete: "CASCADE"
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
    funcionario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'funcionarios',
            key: "id"
        },
        onDelete: "CASCADE"
    },
    ombro:{
        type:DataTypes.STRING,
        allowNull:true
    },
    circunferencia_torax:{
        type:DataTypes.STRING,
        allowNull:true
    },
    circunferencia_abdomen:{
        type:DataTypes.STRING,
        allowNull:true
    },
    costa:{
        type:DataTypes.STRING,
        allowNull:true
    },
    comprimento_manga:{
        type:DataTypes.STRING,
        allowNull:true
    },
    largura_punho:{
        type:DataTypes.STRING,
        allowNull:true
    },
    largura_manga:{
        type:DataTypes.STRING,
        allowNull:true
    },
    comprimento_corpo:{
        type:DataTypes.STRING,
        allowNull:true
    }
})

module.exports = Medida_sob_medida_masculinas
