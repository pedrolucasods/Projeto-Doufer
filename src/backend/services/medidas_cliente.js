const { where } = require('sequelize')
const modelMedidas = require('../models/medidas_cliente')
const { moveEmitHelpers } = require('typescript')
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
    // cliente_id,busto,cintura,quadril,comprimento,ombro,costas,comprimento_da_manga,largura_da_manga
    cadastrar(medidas,cliente_id) {
        let cadastroMedidas = modelMedidas.create({
            cliente_id: cliente_id,
            busto: medidas.busto,
            cintura: medidas.cintura,
            quadril: medidas.quadril,
            comprimento: medidas.comprimento,
            ombro: medidas.ombro,
            costas: medidas.costas,
            comprimento_da_manga: medidas.comprimento_da_manga,
            largura_da_manga: medidas.largura_da_manga

        })
        return cadastroMedidas

    }

    listar(cliente_id) {
        let mediddasCliente = modelMedidas.findOne({
            where: {
                'cliente_id': cliente_id
            }
        })
        return mediddasCliente
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