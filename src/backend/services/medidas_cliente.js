const {QueryTypes} = require('sequelize')
const sequelize = require('../database')

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

    async buscar_medidas_cliente(id){
        const medidas = await sequelize.query(`
            SELECT
                c.id,
                c.nome,
                json_group_array(
                    CASE
                        WHEN med_p.id IS NOT NULL THEN
                            json_object(
                                'id',med_p.id,
                                'sexo',med_p.sexo,
                                'tamanho',med_p.tamanho,
                                'ajuste',med_p.ajuste
                            )
                        ELSE NULL
                    END
                ) AS medida_padrao,
                json_group_array(
                    CASE
                        WHEN med_sob.id IS NOT NULL THEN
                            json_object(
                                'id',med_sob.id,
                                'sexo',med_sob.sexo,
                                'busto',med_sob.busto,
                                'cintura',med_sob.cintura,
                                'quadril',med_sob.quadril,
                                'comprimento',med_sob.comprimento,
                                'ombro',med_sob.ombro,
                                'costas',med_sob.costas,
                                'comprimento_da_manga',med_sob.comprimento_da_manga,
                                'largura_da_manga',med_sob.largura_da_manga
                            
                            )
                        ELSE
                            NULL
                    END
                ) AS medida_sob_medida
            FROM clientes c
            LEFT JOIN medidas_padrao med_p ON c.id = med_p.cliente_id 
            LEFT JOIN medidas_sob_medidas med_sob ON c.id = med_sob.cliente_id
            WHERE c.id = :id;
        `,{
            replacements:{id:id},
            type: QueryTypes.SELECT,
            plain:true
        })

        medidas.medida_padrao = JSON.parse(medidas.medida_padrao)
        medidas.medida_sob_medida = JSON.parse(medidas.medida_sob_medida)
        return medidas
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


}

module.exports = new MedidasCliente()