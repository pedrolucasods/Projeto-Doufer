const ModelmedidasPadrao = require('../models/medidas_padrao')
const modelItensPedido = require('../models/itensPedidos')
const { where } = require('sequelize')
const ServiceCliente = require('./cliente')
const ServiceItens = require('./itenspedido')
const ServiceItemPedidoMedida = require('./item_pedido_medida')

class MedidaPadrao {
    async cadastrar(dados) {
        try {
            if(dados.cliente_id) {
                const buscaCliente = await ServiceCliente.buscarCliente(dados.cliente_id)
                const buscaMedida = await this.buscaPorClienteId(dados.cliente_id)
                if(!buscaCliente) {
                    throw new Error('Cliente não encontrado')
                }
                if(buscaMedida){
                    throw new Error('Ja existe uma medida cadastrada!')
                }
                return ModelmedidasPadrao.create({
                    cliente_id: dados.cliente_id,
                    tamanho: dados.tamanho,
                    ajuste: dados.ajuste
                })
            }else if(dados.item_medida_id) {
                const buscaitem = await ServiceItemPedidoMedida.buscar(dados.item_medida_id)
                if(!buscaitem) {
                    throw new Error('Erro, item não encontrado!')
                }
                return ModelmedidasPadrao.create({
                    item_pedido_medida_id: dados.item_medida_id,
                    tamanho: dados.tamanho,
                    ajuste: dados.ajuste
                })
            }
        } catch (error) {
            throw new Error(`${error.message}`)
        }

    }

    buscaPorClienteId(cliente_id){
        return ModelmedidasPadrao.findOne({where:{cliente_id:cliente_id}})
    }

}

module.exports = new MedidaPadrao()