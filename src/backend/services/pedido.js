const modelCliente = require('../models/cliente')
const modelPedido = require('../models/pedidos')
const modelItensPedido = require('../models/itensPedidos')

class Pedido{

    // listar e formatar
    async listarTodos(){
        const pedidos = await modelPedido.findAll({
            order: [["id","DESC"]],
            include:[
                {
                    model: modelItensPedido,
                    as:"itens",
                    attributes:["id","preco_unitario","quantidade","modelo_produto"]
                },
                {
                    model: modelCliente,
                    as:"clientes",
                    attributes:["nome"]
                }
            ]
        })
        // Criar array formatado com total calculado
        const pedidosFormatados = pedidos.map(p=>{
            const itens = p.itens || []
            const total = itens.reduce((soma, item) => {
                return soma +(item.preco_unitario * item.quantidade)
            }, 0)
            return {
                ...p.dataValues,
                cliente: p.clientes,
                itens,
                total
            }
        })
        return pedidosFormatados
    }

    // Cadastrar pedidos
    async cadastrar(pedidoiten){
        let pedido = []
        let pedidojson = JSON.parse(pedidoiten)
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
                    modelo_produto: items_pedido.modelo,
                    complemento: items_pedido.complemento
                })
            }
        }
        return pedido
    }
    
    async formEditar(id){
        const arraydeItens = []
        const Pedidoid = await id
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
        return {arraydeItens,Pedidoid,pedido_status,pedido_id_cliente,pedido_data,nome}
    }

    async editarPedido(reqbodypedido,reqparamsid){
        let pedido = []
        let pedidojson = JSON.parse(reqbodypedido)
        pedido.push(pedidojson);
        

        for(const informacoes_pedido of pedido){
            let total = 0
            await modelPedido.update({
                cliente_id:informacoes_pedido.clienteId,
                data: informacoes_pedido.data,
                status:'aberto'
                },{where:{id:reqparamsid}})
                
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
                            modelo_produto: items_pedido.modelo,
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
                            id_pedido: reqparamsid,
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
        }

        return pedido
    }

    async deletar(pedido_id){
        await modelPedido.destroy({where:{'id':pedido_id}})
    }
}

module.exports = new Pedido()