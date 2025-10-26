const express = require('express')
const router = express.Router()

router.get('/editar/:id/:nome/:telefone/:cpf/:nome_empresa',function(req,res){
    let idparam = req.params.id
    let nomeparam = req.params.nome
    let telefoneparam = req.params.telefone
    let cpfrequi = req.params.cpf
    let nomeEmpresa_requi = req.params.nome_empresa
    if(cpfrequi === '0'){
        let cpfparam = null
        if(nomeEmpresa_requi === '0'){
            let nomeempresaParam = null
            res.render('editarcliente',{script:'editarcliente.js',idparam,nomeparam,telefoneparam,cpfparam,nomeempresaParam})
        }else{
            let nomeempresaParam = nomeEmpresa_requi
            res.render('editarcliente',{script:'editarcliente.js',idparam,nomeparam,telefoneparam,cpfparam,nomeempresaParam})
        }
        
    }else{
        let cpfparam = req.params.cpf
        if(nomeEmpresa_requi === '0'){
            let nomeempresaParam = null
            res.render('editarcliente',{script:'editarcliente.js',idparam,nomeparam,telefoneparam,cpfparam,nomeempresaParam})
        }else{
            let nomeempresaParam = nomeEmpresa_requi
            res.render('editarcliente',{script:'editarcliente.js',idparam,nomeparam,telefoneparam,cpfparam,nomeempresaParam})
        }
    }
})

module.exports = router