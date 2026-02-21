const db = require('../database')
const {DataTypes} = require('sequelize')

const Medidas_cliente = db.define('medidas_cliente',{
    cliente_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'clientes',
            key:'id'
        },
        onDelete:'CASCADE'
    },
    busto:{
        type: DataTypes.STRING,
        allowNull: true
    },
    cintura:{
        type: DataTypes.STRING,
        allowNull: true
    },
    quadril:{
        type: DataTypes.STRING,
        allowNull: true
    },
    comprimento:{
        type: DataTypes.STRING,
        allowNull: true
    },
    ombro:{
        type: DataTypes.STRING,
        allowNull: true
    },
    costas:{
        type: DataTypes.STRING,
        allowNull: true
    },
    comprimento_da_manga:{
        type: DataTypes.STRING,
        allowNull: true
    },
    largura_da_manga:{
        type: DataTypes.STRING,
        allowNull: true
    }
    
})

module.exports = Medidas_cliente