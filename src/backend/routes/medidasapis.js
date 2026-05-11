const express = require('express')
const router = express.Router()
const MedidaController = require('../controllers/medida')

router.get('/clientes', MedidaController.formulario_cadastro_medidas_cliente_sob_medida)
router.get('/clientes/Padrao/:id', MedidaController.listar_medida_padrao_cliente)
router.get('/clientes/SobMedida/:id', MedidaController.listar_medida_sobmedida_cliente)

router.post('/clientes', MedidaController.cadastrar_medida_cliente)
router.post('/itens-pedidos', MedidaController.cadastrar_medida_itemPedido)

module.exports = router