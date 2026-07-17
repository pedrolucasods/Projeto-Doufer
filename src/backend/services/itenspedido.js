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

}

module.exports = new ItensPedido()