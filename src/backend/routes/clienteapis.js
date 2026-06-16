const express = require('express')
const router = express.Router()
const ClienteController = require('../controllers/cliente')


// cadastro cliente
router.post('/', ClienteController.cadastrar)

// editar cliente
router.put('/:id', ClienteController.editar)

// deletar cliente
router.delete('/:id', ClienteController.deletar)



module.exports = router