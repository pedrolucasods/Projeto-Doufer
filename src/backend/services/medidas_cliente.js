const { where } = require('sequelize')
const modelMedidas = require('../models/medidas_cliente')

class MedidasCliente{
    // cadastro
    // cliente_id,busto,cintura,quadril,comprimento,ombro,costas,comprimento_da_manga,largura_da_manga
    cadastrar(medidas,cliente_id){
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

    listar(cliente_id){
        let mediddasCliente = modelMedidas.findOne({
            where:{
                'cliente_id':cliente_id
            }
        })
        return mediddasCliente
    }

    editar(medidas,cliente_id){
        let editarMedida = modelMedidas.update({
            busto: medidas.busto,
            cintura: medidas.cintura,
            quadril: medidas.quadril,
            comprimento: medidas.comprimento,
            ombro: medidas.ombro,
            costas: medidas.costas,
            comprimento_da_manga: medidas.comprimento_da_manga,
            largura_da_manga: medidas.largura_da_manga
        },{
            where:{
                'cliente_id':cliente_id
            }
        })

        return editarMedida
    }
}

module.exports = new MedidasCliente()