const db = require('../database')
const {DataTypes} = require('sequelize')

const Pedidos = db.define('pedidos',{
    cliente_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'clientes',
            key:'id'
        },
        onDelete:'CASCADE'
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    status:{
        type: DataTypes.ENUM('aberto','finalizado','cancelado'),
        allowNull: false
    }


})

module.exports = Pedidos