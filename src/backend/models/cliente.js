const db = require('../database')
const {DataTypes} = require('sequelize')

const Cliente = db.define('clientes',{
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nome_empresa:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Cliente
