const express = require('express')
const router = express.Router()
const clientemodel = require('../models/cliente')

router.post('/', function(req,res){
    const nomecliente = req.body.namecliente
    const telefonecliente = req.body.telefonecliente
    const cpf = req.body.cpfcliente
    clientemodel.create({
        nome:nomecliente,
        telefone: telefonecliente,
        cpf: cpf
    }).then(function(){
        res.send(`
            <!DOCTYPE html>
            <html>
                <h1>
                    Cliente Cadastrado com sucesso!
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