const express = require('express')
const router = express.Router()

router.get('/editar/:id/:nome/:telefone/:cpf',function(req,res){
    let idparam = req.params.id
    let nomeparam = req.params.nome
    let telefoneparam = req.params.telefone
    let cpfparam = req.params.cpf
    res.render('editarcliente',{script:'editarcliente.js',idparam,nomeparam,telefoneparam,cpfparam})
})

module.exports = router