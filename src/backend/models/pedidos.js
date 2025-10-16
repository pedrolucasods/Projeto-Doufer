const db = require('../database')
const Sequelize = require('sequelize')

const Pedidos = db.define('pedidos',{
    cliente_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    data:{
        type: Sequelize.DATEONLY,
        allowNull:false
    },
    status:{
        type: Sequelize.ENUM('aberto','finalizado','cancelado'),
        allowNull: false
    }


})

module.exports = Pedidos