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

}

module.exports = new ItensPedido()