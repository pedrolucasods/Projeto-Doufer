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
        }else if(dados.tipo_medida == "sob_medida" && dados.sexo == "feminino"){
            return this.medidaSobMedidaFemininaHandler
        }else if(dados.tipo_medida == "sob_medida" && dados.sexo == "feminino"){
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
                                'largura_da_manga',med_sob.largura_da_manga,
                                'criacao',json_object(
                                    'data',DATE(med_sob.createdAt),
                                    'hora',strftime('%H:%M', med_sob.createdAt, '-4 hours')
                                ),
                                'atualizacao',json_object(
                                    'data',DATE(med_sob.updatedAt),
                                    'hora',strftime('%H:%M', med_sob.updatedAt, '-4 hours')
                                )
                            
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