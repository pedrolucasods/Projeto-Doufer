const express = require('express')
const router = express.Router()
const controllerPedido = require('../controllers/pedido')

// rota listar pedido
router.get('/', controllerPedido.pedidos)

// rota formulario cadastrar pedido
router.get('/cadastrarPedido', controllerPedido.formCadastrarPedido)

// rota cadastrar pedido
router.post('/cadastrarPedido', controllerPedido.cadastrarPedido)

// rota formulario editar pedido
router.get('/editar/:id',controllerPedido.formEditarPedido)

// rota editar pedido
router.post('/editar/:id', controllerPedido.editarPedido)

// rota deletar pedido
router.delete('/deletar/:id', controllerPedido.deletarPedido)

// rota para listar pedidos de um cliente específico
router.get('/cliente/:id', controllerPedido.pedidosCliente)

// rota detalhes pedido
router.get('/detalhes/:id', controllerPedido.detalhesPedido)

module.exports = router