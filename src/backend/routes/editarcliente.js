const express = require('express')
const router = express.Router()

router.get('/editar/:id/:nome/:telefone/:cpf',function(req,res){
    let idparam = req.params.id
    let nomeparam = req.params.nome
    let telefoneparam = req.params.telefone
    let cpfrequi = req.params.cpf
    if(cpfrequi === '0'){
        let cpfparam = null
        res.render('editarcliente',{script:'editarcliente.js',idparam,nomeparam,telefoneparam,cpfparam})
    }else{
        let cpfparam = req.params.cpf
        res.render('editarcliente',{script:'editarcliente.js',idparam,nomeparam,telefoneparam,cpfparam})
    }
})

module.exports = router