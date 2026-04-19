const modelItemPedidoMedida = require('../models/item_pedido_medida')

class itemPedidoMedida{
    async buscar(id){
        const pedidoMedida = await modelItemPedidoMedida.findOne({
            where:{
                id:id
            }
        })

        return pedidoMedida
    }
}