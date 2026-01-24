const db = require('../database')
const {DataTypes} = require('sequelize')

const ItensPedidos = db.define('itens_pedidos',{
    id_pedido:{
        type: DataTypes.INTEGER,
        allowNull: false,
        referens:{
            model:'pedido',
            key:'id'
        },
        onDelete: 'CASCADE'
    },
    preco:{
        type: DataTypes.FLOAT
    },
    produto:{
        type: DataTypes.STRING
    },
    cor:{
        type: DataTypes.STRING
    },
    tecido:{
        type: DataTypes.STRING
    },
    tamanho:{
        type: DataTypes.STRING
    },
    detalhes:{
        type: DataTypes.STRING
    },
    quantidade:{
        type: DataTypes.INTEGER
    },
    preco_unitario:{
        type: DataTypes.FLOAT
    },
    modelo_produto:{
        type: DataTypes.STRING
    },
    complemento:{
        type: DataTypes.STRING
    }
})

module.exports = ItensPedidos