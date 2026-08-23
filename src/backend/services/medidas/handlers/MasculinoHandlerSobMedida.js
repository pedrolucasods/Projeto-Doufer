const modelMedidaSobMedidaMasculina = require('../../../models/medida_sob_medida_masculina')
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
                return modelMedidaSobMedidaMasculina.create({
                    cliente_id: dados.cliente_id,
                    circunferencia_torax: dados.circunferencia_torax,
                    circunferencia_abdomen:dados.circunferencia_abdomen,
                    largura_punho:dados.largura_punho,
                    ombro:dados.ombro,
                    costa:dados.costa,
                    comprimento_manga:dados.comprimento_da_manga,
                    largura_manga:dados.largura_da_manga,
                    comprimento_corpo:dados.comprimento_corpo
                })
            }else{
                return modelMedidaSobMedidaMasculina.create({
                    item_pedido_medida_id: dados.item_medida_id,
                    circunferencia_torax: dados.circunferencia_torax,
                    circunferencia_abdomen:dados.circunferencia_abdomen,
                    largura_punho:dados.largura_punho,
                    ombro:dados.ombro,
                    costa:dados.costa,
                    comprimento_manga:dados.comprimento_manga,
                    largura_manga:dados.largura_manga,
                    comprimento_corpo:dados.comprimento_corpo
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
                    circunferencia_torax: dados.circunferencia_torax,
                    circunferencia_abdomen:dados.circunferencia_abdomen,
                    largura_punho:dados.largura_punho,
                    ombro:dados.ombro,
                    costa:dados.costa,
                    comprimento_manga:dados.comprimento_manga,
                    largura_manga:dados.largura_manga,
                    comprimento_corpo:dados.comprimento_corpo
                })
            }
            else if(dados.item_medida_id){
                const buscaMedida = await this.buscarPorItemPedidoMedidaIdEMedidaId(dados.medida_id,dados.item_medida_id)
                if(!buscaMedida){
                    throw new Error('Medida não encontrada!')
                }
                return buscaMedida.update({
                    circunferencia_torax: dados.circunferencia_torax,
                    circunferencia_abdomen:dados.circunferencia_abdomen,
                    largura_punho:dados.largura_punho,
                    ombro:dados.ombro,
                    costa:dados.costa,
                    comprimento_manga:dados.comprimento_manga,
                    largura_manga:dados.largura_manga,
                    comprimento_corpo:dados.comprimento_corpo
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
        return modelMedidaSobMedidaMasculina.findOne({ where: { cliente_id: id } })
    }

    buscarPorItemPedidoMedidaIdEMedidaId(id,itemMedidaId){
        return modelMedidaSobMedidaMasculina.findOne({where:{id:id,item_pedido_medida_id:itemMedidaId}})
    }

    buscarMedidaPorId(id) {
        return modelMedidaSobMedidaMasculina.findOne({ where: { id: id } })
    }

    async buscarMedidaPorItemId(id){
        const medidas = await sequelize.query(`
                SELECT
                    json_group_array(
                        json_object(
                            'id',msmm.id,
                            'ombro',msmm.ombro,
                            'circunferencia_torax',msmm.circunferencia_torax,
                            'circunferencia_abdomen',msmm.circunferencia_abdomen,
                            'costa',msmm.costa,
                            'comprimento_manga',msmm.comprimento_manga,
                            'largura_punho',msmm.largura_punho,
                            'largura_manga',msmm.largura_manga,
                            'comprimento_corpo',msmm.comprimento_corpo,
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
                FROM medida_sob_medida_masculinas msmm
                INNER JOIN item_pedido_medidas ipm ON msmm.item_pedido_medida_id = ipm.id
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
        return modelMedidaSobMedidaMasculina.findOne({ where: { item_pedido_medida_id: id } })
    }

    buscarporMedidaIdEClienteId(medidaPadrao_id,cliente_id){
        return modelMedidaSobMedidaMasculina.findOne({where:{id:medidaPadrao_id,cliente_id:cliente_id}})
    }
    
}

module.exports = new MedidaSobMedida()