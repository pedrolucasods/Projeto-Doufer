const express = require('express')
const router = express.Router()
const clientemodel = require('../models/cliente')
const pedidomodel = require('../models/pedidos')
const itensmodel = require('../models/itensPedidos')

router.get('/',function(req,res){
    pedidomodel.findAll().then(function(pedids){
        res.render('pedido',{stylesheet:'stylepedido.css', script:'scriptpedido.js', layout:'main.handlebars', pedidos:pedids})
    })
})

module.exports = router