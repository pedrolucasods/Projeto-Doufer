const {QueryTypes} = require('sequelize')
const sequelize = require('../database')
const modelItensPedido = require('../models/itensPedidos')

class ItensPedido{
    async buscaritem(id){
        const Item = await modelItensPedido.findOne({
            where:{
                id:id
            }
        })
        if(!Item){
            throw new Error('Item do Pedido não encontrado!')
        }
        return Item
    }

    async cadastrar(dados,transacao){
        return await modelItensPedido.create({
            id_pedido: dados.id_pedido,
            preco: dados.total,
            produto: dados.produto,
            cor: dados.cor,
            tecido: dados.tecido,
            tamanho: dados.tamanho,
            detalhes: dados.detalhes,
            quantidade: dados.quantidade,
            preco_unitario: dados.precounit,
            modelo_produto: dados.modelo,
            complemento: dados.complemento
        },{transaction: transacao})
    }

    async editar(dados){
        let item_pedido = await modelItensPedido.findOne({where:{id:dados.id}})
        if(!item_pedido){
            throw new Error('Item do Pedido não encontrado!')
        }
        return await item_pedido.update({
            preco: dados.total,
            produto: dados.produto,
            cor: dados.cor,
            tecido: dados.tecido,
            tamanho: dados.tamanho,
            detalhes: dados.detalhes,
            quantidade: dados.quantidade,
            preco_unitario: dados.precounit,
            modelo_produto: dados.modelo,
            complemento: dados.complemento
        })
    }

    async deletar(id){
        await modelItensPedido.destroy({where:{id:id}})
    }


    async detalhes(id){
        const dados = await sequelize.query(`
            SELECT
                p.id AS pedido_id,
                c.nome,
                COALESCE(SUM(ipm.quantidade),0) AS quantidade_com_medidas,
                SUM(CASE WHEN ipm.tipo_medida = 'padrao' THEN ipm.quantidade ELSE 0 END) AS quantidade_medidas_padrao,
                SUM(CASE WHEN ipm.tipo_medida = 'sob_medida' THEN ipm.quantidade ELSE 0 END) AS quantidade_medidas_sob_medida,
                json_object(
                    'id',ip.id,
                    'preco',ip.preco,
                    'produto',ip.produto,
                    'cor',ip.cor,
                    'tecido',ip.tecido,
                    'tamanho',ip.tamanho,
                    'detalhes',ip.detalhes,
                    'quantidade',ip.quantidade,
                    'preco_unitario',ip.preco_unitario,
                    'modelo_produto',ip.modelo_produto,
                    'complemento',ip.complemento
                )AS item
            FROM item_pedido_medidas ipm
            RIGHT JOIN itens_pedidos ip ON ipm.item_pedido_id = ip.id
            INNER JOIN pedidos p ON ip.id_pedido = p.id
            INNER JOIN clientes c ON p.cliente_id = c.id
            WHERE ip.id = :id;
        `,{
            replacements:{id:id},
            type:QueryTypes.SELECT,
            plain:true
        })

        dados.item = JSON.parse(dados.item)

        if(!dados.item.id){
            throw new Error('Erro, Item Não Encontrado!')
        }

        return dados
    }
}

module.exports = new ItensPedido()