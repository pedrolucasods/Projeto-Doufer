const modelMedidaSobMedida = require('../models/medidas_sob_medida')
const ServiceCliente = require('./cliente')

class MedidaSobMedida {
    async cadastrar(dados) {
        try {
            if (dados.cliente_id) {
                const cliente = await ServiceCliente.buscarCliente(dados.cliente_id)
                const medidaExistente = await this.buscarMedidaPorClienteId(dados.cliente_id)
                if(medidaExistente){
                    throw new Error('Este cliente já tem tamanho Sob Medida Registrado!')
                }
                return modelMedidaSobMedida.create({
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
                return modelMedidaSobMedida.create({
                    item_pedido_medida_id: dados.item_medida_id,
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
        } catch (error) {
            throw new Error(`${error.message}`)
        }

    }

    async atualizar(dados){
        try {
            const buscaMedida = await this.buscarMedidaPorId(dados.medidaSobMedida_id)
            if(!buscaMedida){
                throw new Error('Medida não encontrada!')
            }
            return modelMedidaSobMedida.update({
                busto: dados.busto,
                cintura:dados.cintura,
                quadril:dados.quadril,
                comprimento:dados.comprimento,
                ombro:dados.ombro,
                costas:dados.costas,
                comprimento_da_manga:dados.comprimento_da_manga,
                largura_da_manga:dados.largura_da_manga
            },{
                where:{
                    id:dados.medidaSobMedida_id
                }
            })
            
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
            return await buscaMedida.destroy()
        } catch (error) {
            throw new Error(`${error.message}`)
        }
    }

    buscarMedidaPorClienteId(id) {
        return modelMedidaSobMedida.findOne({ where: { cliente_id: id } })
    }

    buscarMedidaPorItemPedidoId(id) {
        return modelMedidaSobMedida.findOne({ where: { item_pedido_medida_id: id } })
    }
    buscarMedidaPorId(id) {
        return modelMedidaSobMedida.findOne({ where: { id: id } })
    }
}

module.exports = new MedidaSobMedida()