const {QueryTypes} = require('sequelize')
const sequelize = require('../../database')

const medidaPadraoHandler = require('./handlers/MedidaPadraoHandler')
const medidaSobMedidaFemininaHandler = require('./handlers/FemininoHandlerSobMedida')
const medidaSobMedidaMasculinaHandler = require('./handlers/MasculinoHandlerSobMedida')

class MedidasCliente {
    constructor(){
        this.medidaPadraoHandler = medidaPadraoHandler
        this.medidaSobMedidaFemininaHandler = medidaSobMedidaFemininaHandler
        this.medidaSobMedidaMasculinaHandler = medidaSobMedidaMasculinaHandler
    }

    obterHandler(dados){
        if(dados.tipo_medida == "padrao"){
            return this.medidaPadraoHandler
        }else if(dados.tipo_medida == "sob_medida" && dados.medidas[0].sexo == "feminino"){
            return this.medidaSobMedidaFemininaHandler
        }else if(dados.tipo_medida == "sob_medida" && dados.medidas[0].sexo == "masculino"){
            return this.medidaSobMedidaMasculinaHandler
        }else{
            throw new Error("Tipo de Medida Inválida!")
        }
        
    }

    // cadastro
    async cadastrar_medidas(dados) {
        try {
            const handler = this.obterHandler(dados)
            return await handler.cadastrar(dados.medidas[0])
        } catch (error) {
            throw new Error(`${error.message}`)
        }

    }
    
    async atualizar(dados){
        try {
            const handler = this.obterHandler(dados)
            return await handler.atualizar(dados.medidas[0])
        } catch (error) {
            throw new Error(`${error.message}`)
        }

    }

    async deletar(dados){
        try {
            const handler = this.obterHandler(dados)
            return await handler.deletar(dados)
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
                                'ajuste',med_p.ajuste,
                                'criacao',json_object(
                                    'data',DATE(med_p.createdAt),
                                    'hora',strftime('%H:%M', med_p.createdAt, '-4 hours')
                                ),
                                'atualizacao',json_object(
                                    'data',DATE(med_p.updatedAt),
                                    'hora',strftime('%H:%M', med_p.updatedAt, '-4 hours')
                                )
                            )
                        ELSE NULL
                    END
                ) AS medida_padrao,
                json_group_array(
                    CASE
                        WHEN msmf.id IS NOT NULL THEN
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
                                    'data',DATE(msmf.createdAt),
                                    'hora',strftime('%H:%M', msmf.createdAt, '-4 hours')
                                ),
                                'atualizacao',json_object(
                                    'data',DATE(msmf.updatedAt),
                                    'hora',strftime('%H:%M', msmf.updatedAt, '-4 hours')
                                )
                            
                            )
                        ELSE
                            NULL
                    END
                ) AS medida_sob_medida_feminina,
                json_group_array(
                    CASE
                        WHEN msmm.id IS NOT NULL THEN
                            json_object(
                                'id',msmm.id,
                                'ombro',msmm.ombro,
                                'circunferencia_torax',msmm.circunferencia_torax,
                                'circunferencia_abdomen',msmm.circunferencia_abdomen,
                                'costa',msmm.costa,
                                'comprimento_manga',msmm.comprimento_manga,
                                'largura_punho',msmm.largura_punho,
                                'largura_manga',msmm.largura_manga,
                                'criacao',json_object(
                                    'data',DATE(msmm.createdAt),
                                    'hora',strftime('%H:%M', msmm.createdAt, '-4 hours')
                                ),
                                'atualizacao',json_object(
                                    'data',DATE(msmm.updatedAt),
                                    'hora',strftime('%H:%M', msmm.updatedAt, '-4 hours')
                                )
                            
                            )
                        ELSE
                            NULL
                    END
                ) AS medida_sob_medida_masculina
            FROM clientes c
            LEFT JOIN medidas_padrao med_p ON c.id = med_p.cliente_id 
            LEFT JOIN medida_sob_medida_femininas msmf ON c.id = msmf.cliente_id
            LEFT JOIN medida_sob_medida_masculinas msmm ON c.id= msmm.cliente_id
            WHERE c.id = :id;
        `,{
            replacements:{id:id},
            type: QueryTypes.SELECT,
            plain:true
        })

        medidas.medida_padrao = JSON.parse(medidas.medida_padrao)
        medidas.medida_sob_medida_feminina = JSON.parse(medidas.medida_sob_medida_feminina)
        medidas.medida_sob_medida_masculina = JSON.parse(medidas.medida_sob_medida_masculina)
        return medidas
    }
    
    async buscarMedidaPorClienteId(dados){
        const handler = this.obterHandler(dados)
        const medida = await handler.buscarMedidaPorClienteId(dados.cliente_id)
        return medida
    }

    async buscarMedidaPorId(dados){
        const handler = this.obterHandler(dados)
        const medida = await handler.buscarMedidaPorId(dados.medida_id)
        return medida
    }

}

module.exports = new MedidasCliente()