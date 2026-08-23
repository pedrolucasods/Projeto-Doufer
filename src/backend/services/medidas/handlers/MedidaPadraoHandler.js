const {QueryTypes} = require('sequelize')
const sequelize = require('../../../database')
const ModelmedidasPadrao = require('../../../models/medidas_padrao')
const modelItensPedido = require('../../../models/itensPedidos')
const { where } = require('sequelize')
const ServiceCliente = require('../../cliente')
const ServiceItens = require('../../itenspedido')
const { query } = require('../../../routes/routes')

class MedidaPadrao {
    async cadastrar(dados) {
        try {
            if(dados.cliente_id) {
                const buscaCliente = await ServiceCliente.buscarCliente(dados.cliente_id)
                const buscaMedida = await this.buscarMedidaPorClienteId(dados.cliente_id)
                if(buscaMedida){
                    throw new Error('Ja existe uma medida cadastrada!')
                }
                return ModelmedidasPadrao.create({
                    cliente_id: dados.cliente_id,
                    sexo:dados.sexo,
                    tamanho: dados.tamanho,
                    ajuste: dados.ajuste
                })
            }else if(dados.item_medida_id) {
                return ModelmedidasPadrao.create({
                    item_pedido_medida_id: dados.item_medida_id,
                    sexo: dados.sexo,
                    tamanho: dados.tamanho,
                    ajuste: dados.ajuste
                },{transaction:dados.transacao})
            }
        } catch (error) {
            throw new Error(`${error.message}`)
        }

    }

    async atualizar(dados){
        try {
            if(dados.cliente_id) {
                const buscaMedida = await this.buscarMedidaPorId(dados.medida_id)
                if(!buscaMedida || buscaMedida.cliente_id != dados.cliente_id){
                    throw new Error('Medida não encontrada!')
                }
                return buscaMedida.update({
                    sexo:dados.sexo,
                    tamanho: dados.tamanho,
                    ajuste: dados.ajuste
                })
            
            }else if(dados.item_medida_id) {
                const buscaMedida = await this.buscarPorItemPedidoMedidaIdEMedidaId(dados.medida_id,dados.item_medida_id)
                if(!buscaMedida){
                    throw new Error('Medida não encontrada!')
                }
                return buscaMedida.update({
                    sexo:dados.sexo,
                    tamanho: dados.tamanho,
                    ajuste: dados.ajuste
                },{transaction:dados.transacao})
            }
        } catch (error) {
            throw new Error(`${error.message}`)
        }
    }

    async deletar(dados){
        try {
            const buscaMedida = await this.buscarMedidaPorId(dados.medida_id)
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

    buscarMedidaPorClienteId(cliente_id){
        return ModelmedidasPadrao.findOne({where:{cliente_id:cliente_id}})
    }

    buscarPorItemPedidoMedidaIdEMedidaId(id,itemMedidaId){
        return ModelmedidasPadrao.findOne({where:{id:id,item_pedido_medida_id:itemMedidaId}})
    }

    buscarMedidaPorId(medidaPadrao_id){
        return ModelmedidasPadrao.findOne({where:{id:medidaPadrao_id}})
    }

    async buscarMedidaPorItemId(id){
        let dados = await sequelize.query(`
                SELECT
                    json_group_array(
                        json_object(
                            'id',mp.id,
                            'quantidade',ipm.quantidade,
                            'tamanho',mp.tamanho,
                            'ajuste',mp.ajuste,
                            'sexo',mp.sexo,
                            'criacao',json_object(
                                'data',DATE(mp.createdAt),
                                'hora',strftime('%H:%M', mp.createdAt, '-4 hours')
                            ),
                            'atualizacao',json_object(
                                'data',DATE(mp.updatedAt),
                                'hora',strftime('%H:%M', mp.updatedAt, '-4 hours')
                            )
                        )
                    ) AS medidas
                FROM medidas_padrao mp
                INNER JOIN item_pedido_medidas ipm ON mp.item_pedido_medida_id = ipm.id
                INNER JOIN itens_pedidos ip ON  ipm.item_pedido_id = ip.id
                WHERE ip.id = :id;
        `,{
            replacements:{id:id},
            type:QueryTypes.SELECT,
            plain:true
        })
        dados = JSON.parse(dados.medidas)
        return dados
    }

    buscarMedidaPorItemPedidoMedidaId(id) {
        return ModelmedidasPadrao.findOne({ where: { item_pedido_medida_id: id } })
    }

    buscarporMedidaIdEClienteId(medidaPadrao_id,cliente_id){
        return ModelmedidasPadrao.findOne({where:{id:medidaPadrao_id,cliente_id:cliente_id}})
    }

}

module.exports = new MedidaPadrao()