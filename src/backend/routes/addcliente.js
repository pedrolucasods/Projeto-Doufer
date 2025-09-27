const express = require('express')
const router = express.Router()
const cliente = require('../models/cliente')
 
router.get('/',function(req,res){
    res.render('addcliente',{script:'addcliente.js'})
})

module.exports = router