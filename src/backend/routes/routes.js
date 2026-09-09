const express = require('express')
const home = express.Router()
const clientes = express.Router()
const funcionarios = express.Router()
const pedidos = express.Router()
const itens_pedidos = express.Router()
const medidas = express.Router()
const router = express.Router()
const controllers = require('../controllers/index')

const ROUTES = {
    CLIENTES: '/clientes',
    FUNCIONARIOS: '/funcionarios',
    PEDIDOS: '/pedidos',
    MEDIDAS: '/medidas',
    ITEM_PEDIDOS: '/itens-pedido'
}

// home
home.get('/', controllers.home.home)
router.use('/',home)

// clientes
clientes.route('/')
    .get(controllers.clientes.listar)
    .post(controllers.clientes.cadastrar)

clientes.route('/:id')
    .put(controllers.clientes.editar)
    .delete(controllers.clientes.deletar)
clientes.get('/cadastro', controllers.clientes.formulario_cadastrar)
clientes.get('/editar/:id', controllers.clientes.formulario_editar)
clientes.get('/detalhes/:id', controllers.clientes.detalhes)
router.use('/clientes',clientes)

// funcionarios
funcionarios.get("/empresa/:id",controllers.funcionarios.listar)

funcionarios.route('/')
    .post(controllers.funcionarios.cadastrar)
    .put(controllers.funcionarios.atualizar)

funcionarios.get('/cadastro',controllers.funcionarios.formulario_cadastrar_funcionario)
funcionarios.get('/atualizar/:id',controllers.funcionarios.formulario_atualizar_funcionario)

funcionarios.route('/:id')
    .get(controllers.funcionarios.buscar_funcionario)
    .delete(controllers.funcionarios.deletar)

router.use('/funcionarios',funcionarios)

// pedidos
pedidos.route('/')
    .post(controllers.pedido.cadastrarPedido)
    .get(controllers.pedido.pedidos)

pedidos.route('/:id')
    .put(controllers.pedido.editarPedido)
    .delete(controllers.pedido.deletarPedido)
pedidos.get('/cadastrarPedido', controllers.pedido.formCadastrarPedido)
pedidos.get('/editar/:id',controllers.pedido.formEditarPedido)
pedidos.get('/PedidosCliente/:id', controllers.pedido.pedidosCliente)
pedidos.get('/detalhes/:id', controllers.pedido.detalhesPedido)
router.use('/pedidos',pedidos)

itens_pedidos.get('/detalhes/:id', controllers.item_pedido.detalhes)
router.use('/itens-pedidos',itens_pedidos)

// medidas
medidas.get('/clientes/sob/feminina', controllers.medida.formulario_cadastro_medidas_cliente_sob_medida_feminina)
medidas.get('/clientes/:id/sob/feminina', controllers.medida.formulario_atualizar_medidas_cliente_sob_medida_feminina)
medidas.get('/clientes/sob/masculina', controllers.medida.formulario_cadastro_medidas_cliente_sob_medida_masculina)
medidas.get('/clientes/:id/sob/masculina', controllers.medida.formulario_atualizar_medidas_cliente_sob_medida_masculina)
medidas.get('/clientes/padrao', controllers.medida.formulario_cadastro_medidas_cliente_padrao)
medidas.get('/clientes/listar/:id', controllers.medida.listar_medidas)
medidas.get('/clientes/:id/padrao', controllers.medida.formulario_atualizar_medidas_cliente_padrao)
medidas.post('/clientes', controllers.medida.cadastrar_medida_cliente)
medidas.post('/itens-pedidos', controllers.medida.cadastrar_medida_itemPedido)
medidas.put('/itens-pedidos', controllers.medida.atualizar_medida_itemPedido)
medidas.put('/clientes', controllers.medida.atualizar_medida_cliente)
medidas.delete('/clientes', controllers.medida.deletar_medida_cliente)

medidas.get('/itens-pedidos/:id/padrao', controllers.medida.listar_medidas_item_pedido_padrao)
medidas.get('/itens-pedidos/:id/SobMedida/feminina', controllers.medida.listar_medidas_item_pedido_sob_medida_feminina)
medidas.get('/itens-pedidos/:id/SobMedida/masculina', controllers.medida.listar_medidas_item_pedido_sob_medida_masculina)
medidas.get('/itens-pedidos/:id/cadastro/padrao', controllers.medida.formulario_cadastro_medidas_padrao_item_pedido)
medidas.get('/itens-pedidos/:id/cadastro/SobMedida', controllers.medida.formulario_cadastro_medidas_sob_medida_item_pedido)

medidas.get('/itens-pedidos/:id/atualizar/SobMedida', controllers.medida.formulario_atualizar_medidas_sob_medida_item_pedido)
medidas.get('/itens-pedidos/:id/atualizar/padrao', controllers.medida.formulario_atualizar_medidas_padrao_item_pedido)

router.use('/medidas',medidas)


module.exports = router




