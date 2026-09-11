const {QueryTypes} = require('sequelize')
const sequelize = require('../../database')

const medidaPadraoHandler = require('./handlers/MedidaPadraoHandler')
const medidaSobMedidaFemininaHandler = require('./handlers/FemininoHandlerSobMedida')
const medidaSobMedidaMasculinaHandler = require('./handlers/MasculinoHandlerSobMedida')

class MedidasFuncionario{
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

    async cadastrar(dados){
        try {
            const handler = this.obterHandler(dados)
            return await handler.cadastrar(dados.medidas[0])
        } catch (error) {
            throw new Error(`${error.message}`)
        }
    }
}

module.exports = new MedidasFuncionario()