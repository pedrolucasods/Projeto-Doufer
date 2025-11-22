const express = require('express')
const router = express.Router()
const Pedido = require('../models/pedidos')
const itensPedido = require('../models/itensPedidos')

router.delete('/deletar/:id',async function(req,res){
    const idPedido = req.params.id
    await itensPedido.destroy({where:{'id_pedido':idPedido}})
    await Pedido.destroy({where:{'id':idPedido}})
    .then(function(){
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