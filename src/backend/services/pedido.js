const {QueryTypes} = require('sequelize')
const sequelize = require('../database')

const modelCliente = require('../models/cliente')
const modelPedido = require('../models/pedidos')
const modelItensPedido = require('../models/itensPedidos')
const ClienteService = require('./cliente')
const ItemPedidoService = require('./itenspedido')
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
    async cadastrar(dados){
            const dataToday = new Date().toISOString().split('T')[0]

            const cliente = await ClienteService.buscarCliente(dados.clienteId)
            if(!cliente){
                throw new Error('Cliente não existe!')
            }

            if(cliente.tipo_cliente != dados.tipo_cliente){
                throw new Error("Cliente selecionado não corresponde ao tipo informado.")
            }

            if(dados.data < dataToday){
                throw new Error("Data inválida!")
            }
            let pedido = await modelPedido.create({
                cliente_id:dados.clienteId,
                data: dados.data,
                status:'aberto'
            })

            for(const items_pedido of dados.itens){
                items_pedido.id_pedido = pedido.id
                await ItemPedidoService.cadastrar(items_pedido)
            }

            return pedido
    }
    
    async editar_pedido_dados(id){
        const dados = await sequelize.query(`
            SELECT
                c.nome as nome_cliente,
                c.nome_empresa,
                c.id as cliente_id,
                p.status as pedido_status,
                p.id as pedido_id,
                p.data as pedido_data,
                COUNT(i.id) as quantidade_itens,
                SUM(i.preco) as total_pedido,
                json_group_array(
                    json_object(
                        'id', i.id,
                        'produto',i.produto,
                        'cor',i.cor,
                        'tecido',i.tecido,
                        'tamanho',i.tamanho,
                        'detalhes',i.detalhes,
                        'quantidade',i.quantidade,
                        'preco_unitario',i.preco_unitario,
                        'modelo_produto',i.modelo_produto,
                        'complemento',i.complemento
                    )
                ) as itens
            FROM pedidos p
                INNER JOIN clientes c ON p.cliente_id = c.id
                INNER JOIN itens_pedidos i ON p.id = i.id_pedido
            WHERE p.id = :id;    
            `,
            {
                replacements: {id:id},
                type: QueryTypes.SELECT,
                plain: true
            }
        )

        dados.itens = JSON.parse(dados.itens)

        return dados
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
        let pedido = await modelPedido.update({
            cliente_id:reqbodypedido.clienteId,
            data: reqbodypedido.data,
            status:'aberto'
        },{where:{id:reqparamsid}})


        // atualizar itens
        if(Array.isArray(reqbodypedido.itensatuais) && reqbodypedido.itensatuais.length>0){
            for(const items_pedido of reqbodypedido.itensatuais){
                await ItemPedidoService.editar(items_pedido)
            }
        }

        // excluir itens
        if(reqbodypedido.ItensExcluir.length>0 && Array.isArray(reqbodypedido.ItensExcluir)){
            for(const items_excluir of reqbodypedido.ItensExcluir){
                await ItemPedidoService.deletar(items_excluir.id)
            }
        }


        // cadastrar novos itens
        if(Array.isArray(reqbodypedido.novoItem) && reqbodypedido.novoItem.length > 0){
            for(let items_pedido of reqbodypedido.novoItem){
                items_pedido.id_pedido = reqparamsid
                await ItemPedidoService.cadastrar(items_pedido)

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