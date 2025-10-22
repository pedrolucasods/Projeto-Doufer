const express = require('express')
const router = express.Router()
const clientemodel = require('../models/cliente')

router.get('/',function(req,res){
    clientemodel.findAll().then(function(clients){
        res.render('cliente',{stylesheet:'stylecliente.css', script:'scriptcliente.js', layout:'main.handlebars', clientes:clients})
    })
    
})

module.exports = router