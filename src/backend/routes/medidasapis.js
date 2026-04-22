const express = require('express')
const router = express.Router()
const MedidaController = require('../controllers/medida')

router.post('/', MedidaController.cadastrar)
router.post('/itens-pedidos', MedidaController.cadastrar_medida_itemPedido)

module.exports = router