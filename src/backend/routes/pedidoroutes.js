const express = require('express')
const router = express.Router()
const controllerPedido = require('../controllers/pedido')

// rota listar pedido
router.get('/', controllerPedido.pedidos)

// rota formulario cadastrar pedido
router.get('/cadastrarPedido', controllerPedido.formCadastrarPedido)

// rota formulario editar pedido
router.get('/editar/:id',controllerPedido.formEditarPedido)

// rota para listar pedidos de um cliente específico
router.get('/PedidosCliente/:id', controllerPedido.pedidosCliente)

// rota detalhes pedido
router.get('/detalhes/:id', controllerPedido.detalhesPedido)

module.exports = router