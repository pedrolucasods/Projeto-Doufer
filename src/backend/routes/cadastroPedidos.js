const express = require('express')
const router = express.Router()
const Pedido = require('../models/pedidos')
const ItensPedido = require('../models/itensPedidos')

router.post('/', async function(req,res){
  try {
    if (req.body.pedido) {
        let pedido = []
        pedidojson = JSON.parse(req.body.pedido)
        pedido.push(pedidojson);
        return res.send(pedido)
    }
    
  } catch (err) {
    return res.status(400).send('Erro ao converter itens: ' + err.message);
  }
})

module.exports = router