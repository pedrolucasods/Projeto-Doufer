const modelCliente = require('../models/cliente')
const modelPedido = require('../models/pedidos')
const modelItensPedido = require('../models/itensPedidos')
const ClienteService = require('./cliente')
const ItemPedidoMedidaService = require('./item_pedido_medida')
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

    async buscar_pedido(id){
        const pedido = await modelPedido.findOne({where:{id:id}})
        return pedido
    }

    // Cadastrar pedidos
    async cadastrar(pedidoiten){
        
            let pedido = []
            pedido.push(pedidoiten);
            const dataToday = new Date().toISOString().split('T')[0]

            for(const informacoes_pedido of pedido){
                let total = 0
                const cliente = await ClienteService.buscarCliente(informacoes_pedido.clienteId)
                if(!cliente){
                    throw new Error('Cliente não existe!')
                }
                if(cliente.tipo_cliente != informacoes_pedido.tipo_cliente){
                    throw new Error("Cliente selecionado não corresponde ao tipo informado.")
                }
                
                if(informacoes_pedido.data < dataToday){
                    throw new Error("Data inválida!")
                }
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
    
    async detalhes(id){
        const arraydeItens = []
        const Pedidoid = id
        const Pedido = await modelPedido.findAll({where: {'id':Pedidoid}})
        const itens = await modelItensPedido.findAll({where: {'id_pedido':Pedidoid}})
        let totalPedido = 0
        let quantidadeItens_com_medida = 0
        let medidasItens
        let quantidade_total_de_itens = 0
        for(let info of itens){
            totalPedido+=info.preco
            medidasItens = await ItemPedidoMedidaService.somar_quantidadeMedida_registrada(info.id)
            quantidadeItens_com_medida += medidasItens
            quantidade_total_de_itens+=info.quantidade
        }
        
        
        
        arraydeItens.push(...itens)

        //Info Pedido
        let pedido_status = null
        let pedido_id_cliente = null
        let pedido_data = null
        const quantidade_Itens_do_Pedido = arraydeItens.length
        //For para adicionar os valores nas variaveis
        for (const Infos of Pedido){
                pedido_status = Infos.status
                pedido_id_cliente = Infos.cliente_id
                pedido_data = Infos.data
            }
        // pegando a quantidade de dias faltante
        let dataToday = new Date().toISOString().split('T')[0]
        let DiasFaltante = ((new Date(pedido_data)) - (new Date(dataToday))) / (1000 * 60 * 60 * 24)

        // Busca Nome cliente
        const Cliente = await modelCliente.findAll({where:{'id':pedido_id_cliente}})
        let nome = null
        for(const infoCliente of Cliente)
            nome = infoCliente.nome

        return {
            quantidade_total_de_itens,
            quantidadeItens_com_medida,
            quantidade_Itens_do_Pedido,
            arraydeItens,
            Pedidoid,
            pedido_status,
            pedido_id_cliente,
            pedido_data,
            nome,
            totalPedido,
            DiasFaltante
        }
    }

    async editarPedido(reqbodypedido,reqparamsid){
        let pedido = []
        pedido.push(reqbodypedido);
        

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
        const busca_pedido = await this.buscar_pedido(pedido_id)
        if(!busca_pedido){
            throw new Error('Pedido não encontrado!')
        }
        return await busca_pedido.destroy()
    }

    async pedidosCliente(id){
        const pedidos = await modelPedido.findAll({where:{
            "cliente_id":id
            },
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

    async quantidade_pedidos_clientes(id){
        const quantidade_pedidos = await modelPedido.count({
            where:{
                cliente_id:id
            }
        })
        return quantidade_pedidos
    }
}

module.exports = new Pedido()