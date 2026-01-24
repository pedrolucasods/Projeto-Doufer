const modelPedido = require('../models/pedidos')
const modelItensPedido = require('../models/itensPedidos')
const modelCliente = require('../models/cliente')

class Pedido{
    // listar Pedidos
    async pedidos(req,res){
        try {
            // Carrega pedidos mais recentes primeiro
            const pedidos = await modelPedido.findAll({
                order: [['id', 'DESC']]
            })

            // Carrega itens e clientes
            const itens = await modelItensPedido.findAll()
            const clientes = await modelCliente.findAll()

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

            return res.render('pedido', {
                stylesheet: 'stylepedido.css',
                script: 'scriptpedido.js',
                layout: 'main.handlebars',
                pedidos: pedidosFormatados,
                clientes
            })
        } catch (error) {
            return res.status(500).send(`Erro ao trazer ao exibir os pedidos: ${error}`)
        }
    }

    // formulario cadastrar pedido
    async formCadastrarPedido(req,res){
        try {
            const clientes = await modelCliente.findAll()
            return res.render('addpedido',{
                stylesheet:'styleaddpedido.css', 
                script:'addpedido.js', 
                layout:'main.handlebars', 
                clientes})

        } catch (error) {
            return res.status(500).send(`Erro ao criar um novo pedido: ${error}`)
        }
    }

    // cadastrar pedido
    async cadastrarPedido(req,res){
        try {
            if (req.body.pedido) {
                let pedido = []
                let pedidojson = JSON.parse(req.body.pedido)
                pedido.push(pedidojson);
                

                for(const informacoes_pedido of pedido){
                    let total = 0
                    let pedidoId = await modelPedido.create({
                        cliente_id:informacoes_pedido.clienteId,
                        data: informacoes_pedido.data,
                        status:'aberto'
                    })
                    
                    for(const valor_total of informacoes_pedido.itens){
                    total += valor_total.total
                    }

                    for(const items_pedido of informacoes_pedido.itens){
                        modelItensPedido.create({
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
        } catch (error) {
            return res.status(400).send(`Erro ao cadastrar pedido: ${error}`)
        }
    }

    //formulario editar pedido
    async formEditarPedido(req,res){
        try {
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
            return res.render('editarPedido', {
                    script:'editarpedido.js',
                    Pedidoid,
                    pedido_status,
                    pedido_id_cliente,
                    pedido_data,
                    nome, 
                    ItensPedido:JSON.stringify(arraydeItens)})

        } catch (error) {
            return res.status(500).send(`Erro ao editar pedido: ${error}`)
        }
    }

    // editar pedido
    async editarPedido(req,res){
        try {
            if (req.body.pedido) {
                let pedido = []
                let pedidojson = JSON.parse(req.body.pedido)
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
        } catch (error) {
            return res.status(500).send(`Erro ao editar pedido: ${error}`)
        }
    }

    async deletarPedido(req,res){
        try {
            const idPedido = req.params.id
            await modelItensPedido.destroy({where:{'id_pedido':idPedido}})
            await modelPedido.destroy({where:{'id':idPedido}})
            return res.send(`
                <!DOCTYPE html>
                <html>
                    <h1>
                        Cliente Deletado com sucesso!
                    </h1>
                    <br><br>
                    <a href="/pedidos"><button id="voltar">Voltar ao menu</button></a>
                    
                    <script>
                    </script>    
                </html>
            `)
        } catch (error) {
            return res.status(500).send(`Erro ao deletar pedido: ${error}`)
        }
    }
}

module.exports = new Pedido()