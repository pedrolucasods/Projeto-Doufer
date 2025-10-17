const cliente = require('../models/cliente')
const pedido = require('../models/pedidos')
const itenspedidos = require('../models/itensPedidos')

cliente.hasMany(pedido,{
    foreignKey:'cliente_id',
    as:'pedidos'
})

pedido.belongsTo(cliente,{
    foreignKey:'cliente_id',
    as:'clientes'
})

pedido.hasMany(itenspedidos,{
    foreignKey:'id_pedido',
    as:'itens'
})

itenspedidos.belongsTo(pedido,{
    foreignKey:'id_pedido',
    as:'pedido'
})