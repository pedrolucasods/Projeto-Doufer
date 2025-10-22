const express = require('express')
const router = express.Router()
const cliente = require('../models/cliente')

router.post('/update/:id',function(req,res){
    let idcliente = req.params.id
    let nomecliente = req.body.namecliente
    let telefonecliente = req.body.telefonecliente
    let cpfcliente = req.body.cpfcliente
    cliente.update({
        nome:nomecliente,
        telefone: telefonecliente,
        cpf: cpfcliente
    },{
        where:{
            id: idcliente
        }
    }).then(function(){
        res.send(`
            <!DOCTYPE html>
            <html>
                <h1>
                    Cliente Editado com sucesso!
                </h1>
                <br><br>
                <button id="voltar">Voltar ao menu</button>
                
                <script>
                    document.getElementById('voltar').addEventListener('click', function() {
                        window.location.href = '/clientes'})
                </script>   
            </html>

            `)
    }).catch(function(erro){
        res.send('Erro ao cadastrar:'+ erro)
    })
})

module.exports = router
