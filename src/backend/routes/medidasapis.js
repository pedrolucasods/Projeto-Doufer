const express = require('express')
const router = express.Router()
const MedidaController = require('../controllers/medida')

router.get('/clientes', MedidaController.formulario_cadastro_medidas_cliente_sob_medida)
router.get('/clientes/padrao', MedidaController.formulário_cadastro_medidas_cliente_padrao)
router.get('/clientes/listar/:id', MedidaController.listar_medidas)

router.post('/clientes', MedidaController.cadastrar_medida_cliente)
router.put('/clientes', MedidaController.atualizar_medida_cliente)

router.post('/itens-pedidos', MedidaController.cadastrar_medida_itemPedido)

module.exports = router