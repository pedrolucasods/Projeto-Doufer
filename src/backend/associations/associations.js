const cliente = require('../models/cliente')
const pedido = require('../models/pedidos')
const itenspedidos = require('../models/itensPedidos')
const medidas_cliente = require('../models/medidas_cliente')
const pagamento = require('../models/pagamento')

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

cliente.hasOne(medidas_cliente,{
    foreignKey: 'cliente_id',
    as:'medidas_cliente',
    onDelete:'CASCADE'
})

medidas_cliente.belongsTo(cliente,{
    foreignKey:'cliente_id',
    as:'clientes',
    onDelete:'CASCADE'
})

pedido.hasMany(pagamento,{
    foreignKey:'pedido_id',
    as:'pagamento',
    onDelete:'CASCADE'
})

pagamento.belongsTo(pedido,{
    foreignKey:'pedido_id',
    as:'pedidos',
    onDelete:'CASCADE'
})