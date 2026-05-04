const express = require('express')
const router = express.Router()
const ClienteController = require('../controllers/cliente')

// listar clientes
router.get('/', ClienteController.clientes)

// formulario cadastro
router.get('/cadastro', ClienteController.formCadastrar)

// formulario editar cliente
router.get('/editar/:id', ClienteController.formEditar)

// detalhes cliente
router.get('/detalhes/:id', ClienteController.detalhes)



// listar medidas cliente
router.get('/medidas/listar/:id', ClienteController.listarMedidas)

// editar medidas cliente
router.get('/medidas/editar/:id', ClienteController.formEditar_medidas)


module.exports = router