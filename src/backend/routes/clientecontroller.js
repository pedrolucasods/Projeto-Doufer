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

module.exports = router