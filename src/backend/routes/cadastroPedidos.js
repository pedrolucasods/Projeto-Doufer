const express = require('express')
const router = express.Router()
const Pedido = require('../models/pedidos')
const ItensPedido = require('../models/itensPedidos')

router.post('/', async function(req,res){
  try {
    if (req.body.pedido) {
        let pedido = []
        pedidojson = JSON.parse(req.body.pedido)
        pedido.push(pedidojson);
        

        for(const informacoes_pedido of pedido){
          let total = 0
          let pedidoId = await Pedido.create({
              cliente_id:informacoes_pedido.clienteId,
              data: informacoes_pedido.data,
              status:'aberto'
            })
            
            for(const valor_total of informacoes_pedido.itens){
              total += valor_total.total
            }

            for(const items_pedido of informacoes_pedido.itens){
              ItensPedido.create({
                id_pedido: pedidoId.id,
                preco: items_pedido.total,
                produto: items_pedido.produto,
                cor: items_pedido.cor,
                tecido: items_pedido.tecido,
                tamanho: items_pedido.tamanho,
                detalhes: items_pedido.detalhes,
                quantidade: items_pedido.quantidade,
                preco_unitario: items_pedido.precounit,
                produto_modelo: items_pedido.modelo,
                complemento: items_pedido.complemento
              })
            }
        }
        return res.send(pedido)
    }
    
  } catch (err) {
    return res.status(400).send('Erro ao converter itens: ' + err.message);
  }
})

module.exports = router