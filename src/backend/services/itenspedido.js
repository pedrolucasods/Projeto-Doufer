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

    async cadastrar(dados){
        await modelItensPedido.create({
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
        })
    }

    async editar(dados){
        await modelItensPedido.update({
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
        },{where:{id:dados.id}})
    }

    async deletar(id){
        await modelItensPedido.destroy({where:{id:id}})
    }

}

module.exports = new ItensPedido()