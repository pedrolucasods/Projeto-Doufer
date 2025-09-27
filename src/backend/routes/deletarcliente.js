const express = require('express')
const router = express.Router()
const modelcliente = require('../models/cliente')

router.delete('/deletar/:id',async function(req,res){
    console.log('🔥 ROTA DELETE ACIONADA COM ID:', req.params.id)
    const idcliente = req.params.id
    await modelcliente.destroy({where:{'id':idcliente}}).then(function(){
        res.send(`
            <!DOCTYPE html>
            <html>
                <h1>
                    Cliente Deletado com sucesso!
                </h1>
                <br><br>
                <a href="/clientes"><button id="voltar">Voltar ao menu</button></a>
                
                <script>
                </script>    
            </html>

            `)
    }).catch(function(erro){
        res.send('Erro ao deletar : '+erro)
    })
})

module.exports = router