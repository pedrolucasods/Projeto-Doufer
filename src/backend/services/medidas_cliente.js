const modelMedidas = require('../models/medidas_cliente')
const ServiceMedidaPadrao = require('./medidaspadrao')
const ServiceMedidaSobMedida = require('./medidassobmedida')

class MedidasCliente {
    // cadastro
    async cadastrar_medidas(dados) {
        try {
            const infoMedidas = dados.medidas[0]
            if (dados.tipo_medida == 'padrao') {
                const cadMedidaPadrao = await ServiceMedidaPadrao.cadastrar(infoMedidas)
                return cadMedidaPadrao
            } else if (dados.tipo_medida == 'sob_medida') {
                const cadMedidaSobMedida = await ServiceMedidaSobMedida.cadastrar(infoMedidas)
                return cadMedidaSobMedida
            }
        } catch (error) {
            throw new Error(`${error.message}`)
        }

    }
    
    async atualizar(dados){
        try {
            const infoMedidas = dados.medidas[0]
            const camposMedidas = Object.keys(infoMedidas)
            console.log(camposMedidas)
            if (dados.tipo_medida == 'padrao') {
                const upMedidaPadrao = await ServiceMedidaPadrao.atualizar(infoMedidas)
                return upMedidaPadrao
            } else if (dados.tipo_medida == 'sob_medida') {
                const upMedidaSobMedida = await ServiceMedidaSobMedida.atualizar(infoMedidas)
                return upMedidaSobMedida
            }else{
                throw new Error('Tipo inválido!')
            }

        } catch (error) {
            throw new Error(`${error.message}`)
        }

    }

    async deletar(dados){
        try {
            let deletarMedida
            if(dados.tipo == 'padrao'){
                deletarMedida = ServiceMedidaPadrao.deletar(dados)
            }else if(dados.tipo == 'sob_medida'){
                deletarMedida = ServiceMedidaSobMedida.deletar(dados)
            }
            return deletarMedida
        } catch (error) {
            throw new Error(`${error.message}`)
        }
    }
    listar(cliente_id) {
        let mediddasCliente = modelMedidas.findOne({
            where: {
                'cliente_id': cliente_id
            }
        })
        return mediddasCliente
    }

    buscarMedidaPadraoPorCliente(clienteId){
        let medidaPadrao = ServiceMedidaPadrao.buscaPorClienteId(clienteId)
        return medidaPadrao
    }
    buscarMedidaPadraoPorId(medidaId){
        let medidaPadrao = ServiceMedidaPadrao.buscarporMedidaPadraoId(medidaId)
        if(!medidaPadrao){
            throw new Error('Medida não encontrada!')
        }
        return medidaPadrao
    }

    buscarMedidaSobMedidaPorCliente(clienteId){
        let medidaSobMedida = ServiceMedidaSobMedida.buscarMedidaPorClienteId(clienteId)
        return medidaSobMedida
    }
    
    buscarMedidaSobMedidaPorId(medidaId){
        let medidaSobMedida = ServiceMedidaSobMedida.buscarMedidaPorId(medidaId)
        if(!medidaSobMedida){
            throw new Error('Medida não encontrada!')
        }
        return medidaSobMedida
    }

    listarIdmedida(idmedida) {
        let medidas = modelMedidas.findOne({
            where: {
                'id': idmedida
            }
        })
        return medidas
    }

    editar(medidas, cliente_id) {
        let editarMedida = modelMedidas.update({
            busto: medidas.busto,
            cintura: medidas.cintura,
            quadril: medidas.quadril,
            comprimento: medidas.comprimento,
            ombro: medidas.ombro,
            costas: medidas.costas,
            comprimento_da_manga: medidas.comprimento_da_manga,
            largura_da_manga: medidas.largura_da_manga
        }, {
            where: {
                'cliente_id': cliente_id
            }
        })

        return editarMedida
    }

}

module.exports = new MedidasCliente()