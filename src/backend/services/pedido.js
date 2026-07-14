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
        let dados = await sequelize.query(`
            SELECT
                json_group_array(
                    json_object(
                        'id',pedido_id,
                        'cliente_id', cliente_id,
                        'data',data,
                        'status',status,
                        'nome',nome_cliente,
                        'total',valor_total,
                        'itens',json(itens_do_pedido)
                    )
                ) AS pedidos
            FROM(
                SELECT
                    p.id AS pedido_id,
                    p.cliente_id AS cliente_id,
                    p.data AS data,
                    p.status AS status,
                    c.nome AS nome_cliente,
                    SUM(i.preco) AS valor_total,
                    json_group_array(
                        json_object(
                            'id',i.id,
                            'preco_unitario',i.preco_unitario,
                            'quantidade',i.quantidade,
                            'modelo_produto',i.modelo_produto
                        )
                    ) AS itens_do_pedido
                FROM itens_pedidos i
                    INNER JOIN pedidos p on i.id_pedido = p.id
                    INNER JOIN clientes c on p.cliente_id = c.id
                GROUP BY p.id
            );
            `,
            {
                type: QueryTypes.SELECT,
                plain: true
            })

        dados.pedidos = JSON.parse(dados.pedidos)

        return dados.pedidos
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
        let dados = await sequelize.query(`
            SELECT
                c.nome,
                c.id,
                p.id AS pedido_id,
                p.status AS pedido_status,
                p.data AS pedido_data,
                json_group_array(
                    json_object(
                        'produto',i.produto,
                        'quantidade',i.quantidade,
                        'cor',i.cor,
                        'tecido',i.tecido,
                        'preco_unitario',i.preco_unitario
                    )
                ) OVER() AS itens,
                SUM(i.preco) OVER() AS total_pedido,
                SUM(i.quantidade) OVER() AS total_itens,
                COALESCE(SUM(SUM(im.quantidade)) OVER() , 0) AS total_itens_com_medida,
                ( SUM(i.quantidade) OVER() - COALESCE(SUM(SUM(im.quantidade)) OVER(),0) ) AS total_itens_sem_medida
            FROM item_pedido_medidas im
                RIGHT JOIN itens_pedidos i ON im.item_pedido_id = i.id
                INNER JOIN pedidos p ON i.id_pedido = p.id
                INNER JOIN clientes c ON p.cliente_id = c.id
            WHERE p.id = :id
            GROUP BY i.id;    
        
        `,
        {
            replacements: {id:id},
            type: QueryTypes.SELECT,
            plain: true
        })

        let today = new Date().toISOString().split('T')[0]
        let dias_faltantes = ((new Date(dados.pedido_data)) - (new Date(today))) / (1000 * 60 * 60 * 24)

        dados.dias_faltantes = dias_faltantes
        dados.itens = JSON.parse(dados.itens)

        return dados
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
        let dados = await sequelize.query(`
            SELECT
                json_group_array(
                    json_object(
                        'id',pedido_id,
                        'cliente_id', cliente_id,
                        'data',data,
                        'status',status,
                        'nome',nome_cliente,
                        'total',valor_total,
                        'itens',json(itens_do_pedido)
                    )
                ) AS pedidos
            FROM(
                SELECT
                    p.id AS pedido_id,
                    p.cliente_id AS cliente_id,
                    p.data AS data,
                    p.status AS status,
                    c.nome AS nome_cliente,
                    SUM(SUM(i.preco)) OVER(PARTITION BY p.id) AS valor_total,
                    json_group_array(
                        json_object(
                            'produto',i.produto,
                            'quantidade',i.quantidade,
                            'modelo_produto',i.modelo_produto
                        )
                    ) AS itens_do_pedido
                FROM itens_pedidos i
                    INNER JOIN pedidos p on i.id_pedido = p.id
                    INNER JOIN clientes c on p.cliente_id = c.id
                WHERE c.id = :id
                GROUP BY p.id
            );
            `,
            {
                replacements:{id:id},
                type: QueryTypes.SELECT,
                plain: true
            })
        
        dados.pedidos = JSON.parse(dados.pedidos)
        return dados
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