const express = require('express')
const router = express.Router()
const ClienteController = require('../controllers/cliente')


// cadastro cliente
router.post('/', ClienteController.cadastro)

// editar cliente
router.put('/:id', ClienteController.editar)

// deletar cliente
router.delete('/:id', ClienteController.deletar)



// editar medidas no banco
router.put('/medidas/:id', ClienteController.editarMedidas)

// limpar medidas
router.delete('/medidas/:id', ClienteController.limparMedidas)

module.exports = router