const db = require('../database')
const Sequelize = require('sequelize')

const ItensPedidos = db.define('itens_pedidos',{
    id_pedido:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    preco:{
        type: Sequelize.FLOAT
    },
    produto:{
        type: Sequelize.STRING
    },
    cor:{
        type: Sequelize.STRING
    },
    tecido:{
        type: Sequelize.STRING
    },
    tamanho:{
        type: Sequelize.STRING
    },
    detalhes:{
        type: Sequelize.STRING
    },
    quantidade:{
        type: Sequelize.INTEGER
    },
    preco_unitario:{
        type: Sequelize.FLOAT
    },
    modelo_produto:{
        type: Sequelize.STRING
    },
    complemento:{
        type: Sequelize.STRING
    }
})

module.exports = ItensPedidos