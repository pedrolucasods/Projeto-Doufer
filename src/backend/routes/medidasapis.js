const express = require('express')
const router = express.Router()
const MedidaController = require('../controllers/medida')

router.post('/clientes', MedidaController.cadastrar_medida_cliente)
router.post('/itens-pedidos', MedidaController.cadastrar_medida_itemPedido)

module.exports = router