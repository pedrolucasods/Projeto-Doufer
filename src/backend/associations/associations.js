const cliente = require('../models/cliente')
const pedido = require('../models/pedidos')
const itenspedidos = require('../models/itensPedidos')

cliente.hasMany(pedido,{
    foreignKey:'cliente_id',
    as:'pedidos',
    onDelete:'CASCADE'
})

pedido.belongsTo(cliente,{
    foreignKey:'cliente_id',
    as:'clientes',
    onDelete:'CASCADE'
})

pedido.hasMany(itenspedidos,{
    foreignKey:'id_pedido',
    as:'itens',
    onDelete:'CASCADE'
})

itenspedidos.belongsTo(pedido,{
    foreignKey:'id_pedido',
    as:'pedido',
    onDelete:'CASCADE'
})