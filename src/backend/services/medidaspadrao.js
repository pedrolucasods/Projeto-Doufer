const ModelmedidasPadrao = require('../models/medidas_padrao')
const modelItensPedido = require('../models/itensPedidos')
const { where } = require('sequelize')
const ServiceCliente = require('./cliente')
const ServiceItens = require('./itenspedido')

class MedidaPadrao {
    async cadastrar(dados) {
        try {
            if(dados.cliente_id) {
                const buscaCliente = await ServiceCliente.buscarCliente(dados.cliente_id)
                const buscaMedida = await this.buscaPorClienteId(dados.cliente_id)
                if(buscaMedida){
                    throw new Error('Ja existe uma medida cadastrada!')
                }
                return ModelmedidasPadrao.create({
                    cliente_id: dados.cliente_id,
                    tamanho: dados.tamanho,
                    ajuste: dados.ajuste
                })
            }else if(dados.item_medida_id) {
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

    async atualizar(dados){
        try {
            if(dados.cliente_id) {
                const buscaMedida = await this.buscarporMedidaPadraoId(dados.medidaPadrao_id)
                if(!buscaMedida || buscaMedida.cliente_id != dados.cliente_id){
                    throw new Error('Medida não encontrada!')
                }
                return buscaMedida.update({
                    tamanho: dados.tamanho,
                    ajuste: dados.ajuste
                })
            
            }else if(dados.item_medida_id) {
                const buscaMedida = await this.buscarporMedidaPadraoId(dados.medidaPadrao_id)
                if(!buscaMedida){
                    throw new Error('Medida não encontrada!')
                }
                return buscaMedida.update({
                    tamanho: dados.tamanho,
                    ajuste: dados.ajuste
                })
            }
        } catch (error) {
            throw new Error(`${error.message}`)
        }
    }

    async deletar(dados){
        try {
            const buscaMedida = await this.buscarporMedidaPadraoId(dados.medida_id)
            if(!buscaMedida){
                throw new Error('Medida não encontrada!')
            }
            if(dados.cliente_id){
                if(!buscaMedida.cliente_id || buscaMedida.cliente_id != dados.cliente_id){
                    throw new Error('Medida não encontrada!')
                }
            }else if(dados.item_pedido_medida_id){
                if(!buscaMedida.item_pedido_medida_id || buscaMedida.item_medida_id != dados.item_pedido_medida_id){
                    throw new Error('Medida não encontrada!')
                }
            }
    
            return await buscaMedida.destroy()
        } catch (error) {
            throw new Error(`${error.message}`)
        }
    }

    buscaPorClienteId(cliente_id){
        return ModelmedidasPadrao.findOne({where:{cliente_id:cliente_id}})
    }

    buscarPorItemPedidoMedidaIdETamanho(itemMedidaId,tamanho){
        return ModelmedidasPadrao.findOne({where:{item_pedido_medida_id:itemMedidaId,tamanho:tamanho}})
    }

    buscarporMedidaPadraoId(medidaPadrao_id){
        return ModelmedidasPadrao.findOne({where:{id:medidaPadrao_id}})
    }

    buscarporMedidaPadraoIdEClienteId(medidaPadrao_id,cliente_id){
        return ModelmedidasPadrao.findOne({where:{id:medidaPadrao_id,cliente_id:cliente_id}})
    }

}

module.exports = new MedidaPadrao()