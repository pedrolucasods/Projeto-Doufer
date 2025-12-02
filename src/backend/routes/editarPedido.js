const express = require('express')
const router = express.Router()
const modelPedido = require('../models/pedidos')
const modelItensPedido = require('../models/itensPedidos')
const modelCliente = require('../models/cliente')


router.get('/editar/:id', async function(req,res){
    const arraydeItens = []
    const Pedidoid = await req.params.id
    const Pedido = await modelPedido.findAll({where: {'id':Pedidoid}})
    const itens = await modelItensPedido.findAll({where: {'id_pedido':Pedidoid}})
    await arraydeItens.push(itens[0])

    //Info Pedido
    let pedido_status = await null
    let pedido_id_cliente = await null
    let pedido_data = await null
    //For para adicionar os valores nas variaveis
    for (const Infos of Pedido){
            pedido_status = await Infos.id
            pedido_id_cliente = await Infos.cliente_id
            pedido_data = await Infos.data
        }

    // Busca Nome cliente
    const Cliente = await modelCliente.findAll({where:{'id':pedido_id_cliente}})
    let nome = await null
    for(const infoCliente of Cliente)
        nome = await infoCliente.nome
    //Info Itens Pedido

    
    res.render('editarPedido', {script:'editarpedido.js', pedido_status, pedido_id_cliente, pedido_data,nome, ItensPedido:JSON.stringify(arraydeItens)})
})

module.exports = router