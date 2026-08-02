const db = require('../database')
const {DataTypes} = require('sequelize')

const Funcionario = db.define('funcionarios',{
    cliente_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"clientes",
            key:"id"
        },
        onDelete:"CASCADE"
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone:{
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Funcionario
