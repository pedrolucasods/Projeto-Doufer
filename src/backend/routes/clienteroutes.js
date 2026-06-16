const express = require('express')
const router = express.Router()
const ClienteController = require('../controllers/cliente')

// listar clientes
router.get('/', ClienteController.listar)

// formulario cadastro
router.get('/cadastro', ClienteController.formulário_cadastrar)

// formulario editar cliente
router.get('/editar/:id', ClienteController.formulário_editar)

// detalhes cliente
router.get('/detalhes/:id', ClienteController.detalhes)



module.exports = router