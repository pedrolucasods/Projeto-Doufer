const express = require('express')
const router = express.Router()
const controllerPedido = require('../controllers/pedido')

// rota cadastrar pedido
router.post('/', controllerPedido.cadastrarPedido)

// rota editar pedido
router.put('/:id', controllerPedido.editarPedido)

// rota deletar pedido
router.delete('/:id', controllerPedido.deletarPedido)

module.exports = router