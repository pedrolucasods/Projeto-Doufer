const modelMedidaSobMedidaFeminina = require('../../../models/medida_sob_medida_feminina')
const ServiceCliente = require('../../cliente')

class MedidaSobMedida {
    async cadastrar(dados) {
        try {
            if (dados.cliente_id) {
                const cliente = await ServiceCliente.buscarCliente(dados.cliente_id)
                const medidaExistente = await this.buscarMedidaPorClienteId(dados.cliente_id)
                if(medidaExistente){
                    throw new Error('Este cliente já tem tamanho Sob Medida Registrado!')
                }
                return modelMedidaSobMedidaFeminina.create({
                    cliente_id: dados.cliente_id,
                    busto: dados.busto,
                    cintura:dados.cintura,
                    quadril:dados.quadril,
                    comprimento:dados.comprimento,
                    ombro:dados.ombro,
                    costas:dados.costas,
                    comprimento_da_manga:dados.comprimento_da_manga,
                    largura_da_manga:dados.largura_da_manga
                })
            }else{
                return modelMedidaSobMedidaFeminina.create({
                    item_pedido_medida_id: dados.item_medida_id,
                    busto: dados.busto,
                    cintura:dados.cintura,
                    quadril:dados.quadril,
                    comprimento:dados.comprimento,
                    ombro:dados.ombro,
                    costas:dados.costas,
                    comprimento_da_manga:dados.comprimento_da_manga,
                    largura_da_manga:dados.largura_da_manga
                },{transaction:dados.transacao})
            }
        } catch (error) {
            throw new Error(`${error.message}`)
        }

    }

    async atualizar(dados){
        try {
            if(dados.cliente_id){
                const buscaMedida = await this.buscarMedidaPorId(dados.medida_id)
                if(!buscaMedida){
                    throw new Error('Medida não encontrada!')
                }
                return buscaMedida.update({
                    busto: dados.busto,
                    cintura:dados.cintura,
                    quadril:dados.quadril,
                    comprimento:dados.comprimento,
                    ombro:dados.ombro,
                    costas:dados.costas,
                    comprimento_da_manga:dados.comprimento_da_manga,
                    largura_da_manga:dados.largura_da_manga
                })
            }
            else if(dados.item_medida_id){
                const buscaMedida = await this.buscarPorItemPedidoMedidaIdEMedidaId(dados.medida_id,dados.item_medida_id)
                if(!buscaMedida){
                    throw new Error('Medida não encontrada!')
                }
                return buscaMedida.update({
                    busto: dados.busto,
                    cintura:dados.cintura,
                    quadril:dados.quadril,
                    comprimento:dados.comprimento,
                    ombro:dados.ombro,
                    costas:dados.costas,
                    comprimento_da_manga:dados.comprimento_da_manga,
                    largura_da_manga:dados.largura_da_manga
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
                if(!buscaMedida.item_pedido_medida_id || buscaMedida.item_pedido_medida_id != dados.item_pedido_medida_id){
                    throw new Error('Medida não encontrada!')
                }
            }
            return await buscaMedida.destroy()
        } catch (error) {
            throw new Error(`${error.message}`)
        }
    }

    buscarMedidaPorClienteId(id) {
        return modelMedidaSobMedidaFeminina.findOne({ where: { cliente_id: id } })
    }

    buscarPorItemPedidoMedidaIdEMedidaId(id,itemMedidaId){
        return modelMedidaSobMedidaFeminina.findOne({where:{id:id,item_pedido_medida_id:itemMedidaId}})
    }

    buscarMedidaPorId(id) {
        return modelMedidaSobMedidaFeminina.findOne({ where: { id: id } })
    }

    async buscarMedidaPorItemId(id){
        const medidas = await sequelize.query(`
                SELECT
                    json_group_object(
                        json_object(
                            'id',msmf.id,
                            'busto',msmf.busto,
                            'cintura',msmf.cintura,
                            'quadril',msmf.quadril,
                            'comprimento',msmf.comprimento,
                            'ombro',msmf.ombro,
                            'costas',msmf.costas,
                            'comprimento_da_manga',msmf.comprimento_da_manga,
                            'largura_da_manga',msmf.largura_da_manga,
                            'criacao',json_object(
                                'data',DATE(mp.createdAt),
                                'hora',strftime('%H:%M', mp.createdAt, '-4 hours')
                            ),
                            'atualizacao',json_object(
                                'data',DATE(mp.updatedAt),
                                'hora',strftime('%H:%M', mp.updatedAt, '-4 hours')
                            )
                        )
                    )
                FROM medida_sob_medida_femininas msmf
                INNER JOIN item_pedido_medidas ipm ON msmf.item_pedido_medida_id = ipm.id
                INNER JOIN itens_pedidos ip ON ipm.item_pedido_id = ip.id
                WHERE ip.id = :id;
        `,{
            replacements:{id:id},
            type:QueryTypes.SELECT,
            plain:true
        })
        return medidas
    }

    buscarMedidaPorItemPedidoMedidaId(id) {
        return modelMedidaSobMedidaFeminina.findOne({ where: { item_pedido_medida_id: id } })
    }

    buscarporMedidaIdEClienteId(medidaPadrao_id,cliente_id){
        return modelMedidaSobMedidaFeminina.findOne({where:{id:medidaPadrao_id,cliente_id:cliente_id}})
    }
    
}

module.exports = new MedidaSobMedida()