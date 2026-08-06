const cliente = require('../models/cliente')
const funcionario = require('../models/funcionarios')
const pedido = require('../models/pedidos')
const itenspedidos = require('../models/itensPedidos')
const pagamento = require('../models/pagamento')
const itempedido_medida = require('../models/item_pedido_medida')
const MedidasPadrao = require('../models/medidas_padrao')
const MedidasSobMedida = require('../models/medidas_sob_medida')
const MedidaSobMedidaMasculina = require('../models/medida_sob_medida_masculina')
const MedidaSobMedidaFeminina = require('../models/medida_sob_medida_feminina')

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
    as:'medidas_sob_medida',
    onDelete:'CASCADE'
})

MedidasSobMedida.belongsTo(cliente,{
    foreignKey:'cliente_id',
    as:'clientes',
    onDelete:'CASCADE'
})


itempedido_medida.hasMany(MedidasSobMedida,{
    foreignKey:'item_pedido_medida_id',
    as:'medidas_sob_medida',
    onDelete:'CASCADE'
})

MedidasSobMedida.belongsTo(itenspedidos,{
    foreignKey:'item_pedido_medida_id',
    as:'itens_medidas',
    onDelete:'CASCADE'
})

cliente.hasMany(MedidasPadrao,{
    foreignKey:'cliente_id',
    as:'medidas_padrao_cliente',
    onDelete:'CASCADE'
})

MedidasPadrao.belongsTo(cliente,{
    foreignKey:'cliente_id',
    as:'clientes',
    onDelete:'CASCADE'
})

funcionario.hasMany(MedidasPadrao,{
    foreignKey:'funcionario_id',
    as:'medidas_padrao_funcionario',
    onDelete:'CASCADE'
})

MedidasPadrao.belongsTo(funcionario,{
    foreignKey:'funcionario_id',
    as:'funcionarios',
    onDelete:'CASCADE'
})


itempedido_medida.hasMany(MedidasPadrao,{
    foreignKey:'item_pedido_medida_id',
    as:'medidas_padrao_item',
    onDelete:'CASCADE'
})

MedidasPadrao.belongsTo(itenspedidos,{
    foreignKey:'item_pedido_medida_id',
    as:'itens_medidas',
    onDelete:'CASCADE'
})

cliente.hasMany(funcionario,{
    foreignKey:"cliente_id",
    as:"funcionarios",
    onDelete:"CASCADE"
})

funcionario.belongsTo(cliente,{
    foreignKey:"cliente_id",
    as:"clientes",
    onDelete:"CASCADE"
})

cliente.hasMany(MedidaSobMedidaMasculina,{
    foreignKey:'cliente_id',
    as:'medida_sob_medidas_masculinas',
    onDelete:'CASCADE'
})

MedidaSobMedidaMasculina.belongsTo(cliente,{
    foreignKey:'cliente_id',
    as:'clientes',
    onDelete:'CASCADE'
})

funcionario.hasMany(MedidaSobMedidaMasculina,{
    foreignKey:'funcionario_id',
    as:'medida_sob_medidas_masculinas',
    onDelete:'CASCADE'
})

MedidaSobMedidaMasculina.belongsTo(funcionario,{
    foreignKey:'funcionario_id',
    as:'funcionarios',
    onDelete:'CASCADE'
})

itempedido_medida.hasMany(MedidaSobMedidaMasculina,{
    foreignKey:'item_pedido_medida_id',
    as:'medida_sob_medidas_masculinas',
    onDelete:'CASCADE'
})

MedidaSobMedidaMasculina.belongsTo(itenspedidos,{
    foreignKey:'item_pedido_medida_id',
    as:'itens_medidas',
    onDelete:'CASCADE'
})

cliente.hasMany(MedidaSobMedidaFeminina,{
    foreignKey:'cliente_id',
    as:'medida_sob_medidas_femininas',
    onDelete:'CASCADE'
})

MedidaSobMedidaFeminina.belongsTo(cliente,{
    foreignKey:'cliente_id',
    as:'clientes',
    onDelete:'CASCADE'
})

funcionario.hasMany(MedidaSobMedidaFeminina,{
    foreignKey:'funcionario_id',
    as:'medida_sob_medidas_femininas',
    onDelete:'CASCADE'
})

MedidaSobMedidaFeminina.belongsTo(funcionario,{
    foreignKey:'funcionario_id',
    as:'funcionarios',
    onDelete:'CASCADE'
})

itempedido_medida.hasMany(MedidaSobMedidaFeminina,{
    foreignKey:'item_pedido_medida_id',
    as:'medida_sob_medidas_femininas',
    onDelete:'CASCADE'
})

MedidaSobMedidaFeminina.belongsTo(itenspedidos,{
    foreignKey:'item_pedido_medida_id',
    as:'itens_medidas',
    onDelete:'CASCADE'
})