const modelMedidas = require('../models/medidas_cliente')
const ServiceMedidaPadrao = require('./medidaspadrao')
const ServiceMedidaSobMedida = require('./medidassobmedida')

class MedidasCliente {
    // cadastro
    async cadastrar_medidas(dados) {
        try {
            const infoMedidas = dados.medidas[0]
            const camposMedidas = Object.keys(infoMedidas)
            console.log(camposMedidas)
            if (dados.tipo_medida == 'padrao') {
                if (
                    !camposMedidas.includes('cliente_id') ||
                    !camposMedidas.includes('tamanho') ||
                    !camposMedidas.includes('ajuste')
                ) {
                    throw new Error("Erro ao cadastrar medida!")
                }
                if (camposMedidas.length != 3) {
                    throw new Error("Erro ao cadastrar medida!")
                }
                const cadMedidaPadrao = await ServiceMedidaPadrao.cadastrar(infoMedidas)
                return cadMedidaPadrao
            } else if (dados.tipo_medida == 'sob_medida') {
                if (camposMedidas.length != 9) {
                    throw new Error('Erro ao cadastrar medida')
                }
                if (
                    !camposMedidas.includes('cliente_id') ||
                    !camposMedidas.includes('busto') ||
                    !camposMedidas.includes('cintura') ||
                    !camposMedidas.includes('quadril') ||
                    !camposMedidas.includes('comprimento') ||
                    !camposMedidas.includes('ombro') ||
                    !camposMedidas.includes('costas') ||
                    !camposMedidas.includes('comprimento_da_manga') ||
                    !camposMedidas.includes('largura_da_manga')
                ) {
                    throw new Error('Erro ao cadastrar medida!')
                }
                const cadMedidaSobMedida = await ServiceMedidaSobMedida.cadastrar(infoMedidas)
                return cadMedidaSobMedida
            } else {
                throw new Error('Tipo inválido!')
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
                if (
                    !camposMedidas.includes('medidaPadrao_id')||
                    !camposMedidas.includes('cliente_id') ||
                    !camposMedidas.includes('tamanho') ||
                    !camposMedidas.includes('ajuste')
                ) {
                    throw new Error("Erro ao cadastrar medida!")
                }
                if (camposMedidas.length != 4) {
                    throw new Error("Erro ao cadastrar medida!")
                }
                const upMedidaPadrao = await ServiceMedidaPadrao.atualizar(infoMedidas)
                return upMedidaPadrao
            } else if (dados.tipo_medida == 'sob_medida') {
                if (camposMedidas.length != 10) {
                    throw new Error('Erro ao cadastrar medida')
                }
                if (
                    !camposMedidas.includes('medidaSobMedida_id')||
                    !camposMedidas.includes('cliente_id') ||
                    !camposMedidas.includes('busto') ||
                    !camposMedidas.includes('cintura') ||
                    !camposMedidas.includes('quadril') ||
                    !camposMedidas.includes('comprimento') ||
                    !camposMedidas.includes('ombro') ||
                    !camposMedidas.includes('costas') ||
                    !camposMedidas.includes('comprimento_da_manga') ||
                    !camposMedidas.includes('largura_da_manga')
                ) {
                    throw new Error('Erro ao cadastrar medida!')
                }
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
            const campos = Object.keys(dados)
            if((campos.length !=2) || (!campos.includes('tipo') || !campos.includes('medida_id'))){
                throw new Error('Erro ao deletar!')
            }
            if(dados.tipo == 'padrao'){
                const deletarMedida = ServiceMedidaPadrao.deletar(dados)
                return deletarMedida
            }else if(dados.tipo == 'sob_medida'){
                const deletarMedida = ServiceMedidaSobMedida.deletar(dados)
                return deletarMedida
            }else{
                throw new Error('Tipo inválido!')
            }
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
        return medidaPadrao
    }

    buscarMedidaSobMedidaPorCliente(clienteId){
        let medidaSobMedida = ServiceMedidaSobMedida.buscarMedidaPorClienteId(clienteId)
        return medidaSobMedida
    }
    
    buscarMedidaSobMedidaPorId(medidaId){
        let medidaSobMedida = ServiceMedidaSobMedida.buscarMedidaPorId(medidaId)
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

    limpar(idmedida) {
        let deletarMedidas = modelMedidas.destroy({
            where: {
                "id": idmedida
            }
        })
        return deletarMedidas
    }
}

module.exports = new MedidasCliente()