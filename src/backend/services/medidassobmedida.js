const modelMedidaSobMedida = require('../models/medidas_sob_medida')
const ServiceCliente = require('./cliente')

class MedidaSobMedida {
    async cadastrar(dados) {
        try {
            if (dados.cliente_id) {
                const cliente = await ServiceCliente.buscarCliente(dados.cliente_id)
                if (!cliente) {
                    throw new Error('Cliente não encontrado!')
                }
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
            }
        } catch (error) {
            throw new Error(`${error.message}`)
        }

    }

    buscarMedidaPorClienteId(id) {
        return modelMedidaSobMedida.findOne({ where: { cliente_id: id } })
    }
}

module.exports = new MedidaSobMedida()