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
    await arraydeItens.push(...itens)

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


    res.render('editarPedido', {script:'editarpedido.js',Pedidoid, pedido_status, pedido_id_cliente, pedido_data,nome, ItensPedido:JSON.stringify(arraydeItens)})
})

router.post('/alterar/:id/',async function(req,res){
    try {
    if (req.body.pedido) {
        let pedido = []
        pedidojson = JSON.parse(req.body.pedido)
        pedido.push(pedidojson);
        

        for(const informacoes_pedido of pedido){
            let total = 0
            await modelPedido.update({
                cliente_id:informacoes_pedido.clienteId,
                data: informacoes_pedido.data,
                status:'aberto'
                },{where:{id:req.params.id}})
                
                for(const valor_total of informacoes_pedido.itens){
                total += valor_total.total
                }

                if(Array.isArray(informacoes_pedido.itensatuais) && informacoes_pedido.itensatuais.length>0){
                    for(const items_pedido of informacoes_pedido.itensatuais){
                        modelItensPedido.update({
                            id_pedido: items_pedido.id_pedido,
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
                        },{where:{id:items_pedido.id}})
                    }
                }else{
                if(informacoes_pedido.ItensExcluir.length>0 && Array.isArray(informacoes_pedido.ItensExcluir)){
                        for(const items_excluir of informacoes_pedido.ItensExcluir){
                            modelItensPedido.destroy({
                                where:{
                                    id:items_excluir.id
                                }
                            })

                        }
                    }else {
                        
                        
                    }
                }

                if(Array.isArray(informacoes_pedido.novoItem) && informacoes_pedido.novoItem.length > 0){
                    for(const items_pedido of informacoes_pedido.novoItem){
                        modelItensPedido.create({
                            id_pedido: req.params.id,
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
                }else{
                    
                }
                
            
            return res.send(pedido)
        }
    
        } 
    } catch (err) {
        return res.status(400).send('Erro ao converter itens: ' + err.message);
    }

})


module.exports = router