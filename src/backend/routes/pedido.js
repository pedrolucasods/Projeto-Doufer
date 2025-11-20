const express = require('express')
const router = express.Router()
const Cliente = require('../models/cliente');
const Pedido = require('../models/pedidos');         // CORRETO
const ItemPedido = require('../models/itensPedidos'); // CORRETO

router.get('/', async function(req, res) {

    // Carrega pedidos mais recentes primeiro
    const pedidos = await Pedido.findAll({
        order: [['id', 'DESC']]
    })

    // Carrega itens e clientes
    const itens = await ItemPedido.findAll()
    const clientes = await Cliente.findAll()

    // Criar array formatado com total calculado
    const pedidosFormatados = pedidos.map(p => {
        
        const itensDoPedido = itens.filter(i => i.id_pedido === p.id)

        const total = itensDoPedido.reduce((soma, item) => {
            return soma + (item.preco_unitario * item.quantidade)
        }, 0)

        return {
            ...p.dataValues,
            itens: itensDoPedido,
            total
        }
    })

    res.render('pedido', {
        stylesheet: 'stylepedido.css',
        script: 'scriptpedido.js',
        layout: 'main.handlebars',
        pedidos: pedidosFormatados,
        clientes
    })
})

module.exports = router