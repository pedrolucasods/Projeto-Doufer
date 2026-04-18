const cliente = require('../models/cliente')
const pedido = require('../models/pedidos')
const itenspedidos = require('../models/itensPedidos')
const medidas_cliente = require('../models/medidas_cliente')
const pagamento = require('../models/pagamento')
const itempedido_medida = require('../models/item_pedido_medida')
const MedidasPadrao = require('../models/medidas_padrao')
const MedidasSobMedida = require('../models/medidas_sob_medida')

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

itenspedidos.hasMany(itempedido_medida,{
    foreignKey:'item_pedido_id',
    as:'item_pedido_medidas',
    onDelete:'CASCADE'
})

itempedido_medida.belongsTo(itenspedidos,{
    foreignKey:'item_pedido_id',
    as:'itens',
    onDelete:'CASCADE'
})


cliente.hasMany(MedidasSobMedida,{
    foreignKey:'cliente_id',
    as: 'medidas_padrao',
    onDelete: 'CASCADE'
})

MedidasSobMedida.belongsTo(cliente,{
    foreignKey:'cliente_id',
    as: 'clientes',
    onDelete: 'CASCADE'
})


itempedido_medida.hasMany(MedidasSobMedida,{
    foreignKey:'item_pedido_medida_id',
    as: 'medidas_sob_medida',
    onDelete: 'CASCADE'
})

MedidasSobMedida.belongsTo(itenspedidos,{
    foreignKey:'item_pedido_medida_id',
    as: 'itens_medidas',
    onDelete: 'CASCADE'
})

cliente.hasMany(MedidasPadrao,{
    foreignKey:'cliente_id',
    as: 'medidas_padrao',
    onDelete: 'CASCADE'
})

MedidasPadrao.belongsTo(cliente,{
    foreignKey:'cliente_id',
    as: 'clientes',
    onDelete: 'CASCADE'
})


itempedido_medida.hasMany(MedidasPadrao,{
    foreignKey:'item_pedido_medida_id',
    as: 'medidas_padrao',
    onDelete: 'CASCADE'
})

MedidasPadrao.belongsTo(itenspedidos,{
    foreignKey:'item_pedido_medida_id',
    as: 'itens_medidas',
    onDelete: 'CASCADE'
})

