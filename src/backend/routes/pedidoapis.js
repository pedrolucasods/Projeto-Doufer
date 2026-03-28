const express = require('express')
const router = express.Router()
const controllerPedido = require('../controllers/pedido')

// rota cadastrar pedido
router.post('/cadastrarPedido', controllerPedido.cadastrarPedido)

// rota editar pedido
router.post('/editar/:id', controllerPedido.editarPedido)

// rota deletar pedido
router.delete('/deletar/:id', controllerPedido.deletarPedido)

module.exports = router