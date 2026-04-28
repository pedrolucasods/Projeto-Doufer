const { NOT } = require('sequelize/lib/deferrable')
const modelItemPedidoMedida = require('../models/item_pedido_medida')
const modelMedidaPadrao = require('../models/medidas_padrao')
const serviceItemPedido = require('./itenspedido')
const ServiceMedidaPadrao = require('./medidaspadrao')
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

            // validação de item pedido
            if(!itemPedido){
                throw new Error('Item do Pedido não encontrado!')
            }

            // validação da quantidade
            const total = itemPedido.quantidade
            const totalItemMedida = await this.somar_quantidadeMedida_registrada(dados.item_pedido_id)
            if(dadosQuantidade>total || totalItemMedida+dadosQuantidade>total || dadosQuantidade<1 || isNaN(dadosQuantidade)){
                throw new Error('Quantidade inválida!')
                
            }

            // cadastro do item pedido medida
            const cadastro = await modelItemPedidoMedida.create({
                item_pedido_id:dados.item_pedido_id,
                tipo_medida:dados.tipo_medida,
                quantidade:dadosQuantidade
            })

            // validação do cadastro
            if(!cadastro){
                throw new Error("Erro ao cadastrar a medida padrão!")
            }

            // se for medida padrão faz isso
            if(dados.tipo_medida=='padrao'){
                let medidaPadrao = {}
                for(const valores of dados.medidas){
                    medidaPadrao = {
                        item_medida_id: cadastro.id, tamanho: valores.tamanho, ajuste: valores.ajuste
                    }
                }

                // validação de mesmo tamanho para o mesmo item pedido
                const testedata = await this.buscarPorMedidasDoMesmoItem_ComMesmaMedida(cadastro.item_pedido_id,medidaPadrao.tamanho)
                let valorbool = testedata?'1':null
                if(valorbool){
                    throw new Error('Já existe medida igual registrada para esse item!')
                }


                // validação caso duplique
                const buscaDuplicadaMedidaPadrao = await ServiceMedidaPadrao.buscarPorItemPedidoMedidaIdETamanho(cadastro.id,medidaPadrao.tamanho)
                if(buscaDuplicadaMedidaPadrao){
                    throw new Error('Ja existe esse tamanho registrado para esta divisão!')
                }

                // cadastro da medida padrão
                const cadMedidaPadrao = await ServiceMedidaPadrao.cadastrar(medidaPadrao)
                return cadastro
            }else if(dados.tipo_medida=='sob_medida'){
                return res.json({"Teste":"cadastro sob medida de itens pedidos"})
            } 
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

    // consulta para procurar mesmo tamanho padrao para o mesmo item
    async buscarPorMedidasDoMesmoItem_ComMesmaMedida(id,medida){
        const consulta = await modelItemPedidoMedida.findOne({
            where:{
                item_pedido_id:id
            },
            include:[{
                model:modelMedidaPadrao,
                as: 'medidas_padrao_item',
                required: true,
                where:{
                    tamanho:medida
                },
                attibutes: ['tamanho']
            }]
        })
        return consulta
    }
}

module.exports = new ItemPedidoMedida()