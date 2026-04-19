const express = require('express')
const router = express.Router()
const MedidaController = require('../controllers/medida')

router.post('/', MedidaController.cadastrar)

module.exports = router