const ItemPedidoService = require('../services/itenspedido')

class ItemPedido{
    async detalhes(req,res){
        try {
            const dados = await ItemPedidoService.detalhes(req.params.id)
            return res.render('detalhes-item-pedido',
                {
                    stylesheet:'detalhes-item-pedido.css',
                    script:'detalhes-item-pedido.js',
                    ...dados,
                    error:req.query.error || null,
                    msg: req.query.msg || null
                })
        } catch (error) {
            return res.status(500).send(`Erro ao exibir os detalhes do item!: ${error}`)
        }
    }
}

module.exports = new ItemPedido()