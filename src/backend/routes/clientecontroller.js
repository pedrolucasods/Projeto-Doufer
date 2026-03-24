const express = require('express')
const router = express.Router()
const ClienteController = require('../controllers/cliente')

// listar clientes
router.get('/', ClienteController.clientes)

// formulario cadastro
router.get('/cadastro', ClienteController.formCadastrar)

// cadastro cliente
router.post('/cadastro', ClienteController.cadastro)

// formulario editar cliente
router.get('/editar/:id', ClienteController.formEditar)

// editar cliente
router.post('/editar/:id', ClienteController.editar)

// deletar cliente
router.delete('/deletar/:id', ClienteController.deletar)

// detalhes cliente
router.get('/detalhes/:id', ClienteController.detalhes)

// cadastrar medidas cliente
router.post('/medidas/:id', ClienteController.cadastrarMedidas)

// formulario cadastrar Medida
router.get('/medidas/:id', ClienteController.formCadastrar_Medidas)

// listar medidas cliente
router.get('/medidas/listar/:id', ClienteController.listarMedidas)

// editar medidas cliente
router.get('/medidas/editar/:id', ClienteController.formEditar_medidas)

// editar medidas no banco
router.put('/medidas/editar/:id', ClienteController.editarMedidas)

// limpar medidas
router.delete('/medidas/limpar/:id', ClienteController.limparMedidas)


module.exports = router