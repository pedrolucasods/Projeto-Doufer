const { NOT } = require('sequelize/lib/deferrable')
const modelItemPedidoMedida = require('../models/item_pedido_medida')
const serviceItemPedido = require('./itenspedido')
class ItemPedidoMedida{
    async buscar(id){
        const pedidoMedida = await modelItemPedidoMedida.findOne({
            where:{
                id:id
            }
        })

        return pedidoMedida
    }

    async buscarPorItemPedidoId(item_id){
        const pedidoMedida = await modelItemPedidoMedida.findOne({where:{item_pedido_id:item_id}})
        return pedidoMedida
    }
    async cadastrar(dados){
        try {
            const dadosQuantidade = parseInt(dados.quantidade)
            const itemPedido = await serviceItemPedido.buscaritem(dados.item_pedido_id)
            if(!itemPedido){
                throw new Error('Item do Pedido não encontrado!')
            }
            const total = itemPedido.quantidade
            const totalItemMedida = await this.somar_quantidadeMedida_registrada(dados.item_pedido_id)
            if(dadosQuantidade>total || totalItemMedida+dadosQuantidade>total || dadosQuantidade<1 || isNaN(dadosQuantidade)){
                throw new Error('Quantidade inválida!')
                
            }
            const cadastro = await modelItemPedidoMedida.create({
                item_pedido_id:dados.item_pedido_id,
                tipo_medida:dados.tipo_medida,
                quantidade:dadosQuantidade
            })
            return cadastro   
        } catch (error) {
            throw new Error(`${error.message}`)
        }
    }

    async somar_quantidadeMedida_registrada(item_pedido_id){
        const total = 0
        const item = await this.buscarPorItemPedidoId(item_pedido_id)
        if(!item){
            return total
        }
        const totaldb = await modelItemPedidoMedida.sum('quantidade',{where:{item_pedido_id:item_pedido_id}})
        return totaldb
    }
}

module.exports = new ItemPedidoMedida()