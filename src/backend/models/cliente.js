const db = require('../database')
const Sequelize = require('sequelize')

const Cliente = db.define('clientes',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Cliente
