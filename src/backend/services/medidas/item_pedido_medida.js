const {QueryTypes} = require('sequelize')
const sequelize = require('../../database')
const medidaPadraoHandler = require('./handlers/MedidaPadraoHandler')
const medidaSobMedidaFemininaHandler = require('./handlers/FemininoHandlerSobMedida')
const medidaSobMedidaMasculinaHandler = require('./handlers/MasculinoHandlerSobMedida')

const modelItemPedidoMedida = require('../../models/item_pedido_medida')
const modelMedidaPadrao = require('../../models/medidas_padrao')
const modelSobMedidaFeminina = require('../../models/medida_sob_medida_feminina')
const modelSobMedidaMasculina = require('../../models/medida_sob_medida_masculina')
const modelSobMedida = require('../../models/medidas_sob_medida')
const serviceItemPedido = require('../itenspedido')
const ServiceMedidaPadrao = require('../medidaspadrao')
const ServiceMedidaSobMedida = require('../medidassobmedida')

class ItemPedidoMedida{
    constructor(){
        this.medidaPadraoHandler = medidaPadraoHandler
        this.medidaSobMedidaFemininaHandler = medidaSobMedidaFemininaHandler
        this.medidaSobMedidaMasculinaHandler = medidaSobMedidaMasculinaHandler
        this.model_padrao = modelMedidaPadrao
        this.model_sob_feminina = modelSobMedidaFeminina
        this.model_sob_masculina = modelSobMedidaMasculina
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

    obterModel(tipo,dados){
        if(tipo == "padrao"){
            return [this.model_padrao,dados,"medidas_padrao_item"]
        }else if(tipo == "sob_medida" && dados.sexo == "feminino"){
            delete dados.sexo
            return [this.model_sob_feminina,dados,"medida_sob_medidas_femininas"]
        }else if(tipo == "sob_medida" && dados.sexo == "masculino"){
            delete dados.sexo
            return [this.model_sob_masculina,dados,"medida_sob_medidas_masculinas"]
        }else{
            throw new Error("Tipo Inválido de Medida")
        }
    }

    async buscar(id){
        const pedidoMedida = await modelItemPedidoMedida.findOne({
            where:{
                id:id
            }
        })
        return pedidoMedida
    }

    async buscarPorItemPedidoId(item_id){
        const pedidoMedida = await modelItemPedidoMedida.findOne({where:{item_pedido_id:item_id}})
        return pedidoMedida
    }

    async listar_medidas_item_pedido(dados){
        const handler = this.obterHandler(dados)
        const medidas = await handler.buscarMedidaPorItemId(dados.item_id)
        let resultado = await sequelize.query(`
            SELECT
                p.id AS pedido_id,
                c.nome AS cliente_nome,
                ip.id AS item_id,
                ip.produto AS produto,
                ip.cor AS cor,
                ip.quantidade AS quantidade_produto,
                ip.quantidade - SUM(coalesce(ipm.quantidade,0)) AS quantidade_disponivel
            FROM itens_pedidos ip 
            LEFT JOIN item_pedido_medidas ipm ON ipm.item_pedido_id = ip.id
            INNER JOIN pedidos p ON ip.id_pedido = p.id
            INNER JOIN clientes c ON p.cliente_id = c.id
            WHERE ip.id=:id
            GROUP BY p.id; 
        `,{
            replacements:{id:dados.item_id},
            type:QueryTypes.SELECT,
            plain:true
        })
        resultado.quantidade_medidas = medidas.map(med=>med.quantidade).reduce((soma,quantiade)=>soma+quantiade,0)
        resultado.medida = medidas
        return resultado
    }

    async dados_formulario_cadastro_medidas_item_pedido(item_id){
        const dados = await sequelize.query(`
            SELECT
                COALESCE(c.nome,c.nome_empresa) AS cliente,
                ip.id_pedido AS pedido_id,
                ip.id AS item_id,
                ip.produto,
                ip.modelo_produto,
                ip.cor,
                ip.quantidade - COALESCE(SUM(ipm.quantidade),0) AS quantidade_disponivel
            FROM item_pedido_medidas ipm
            RIGHT JOIN itens_pedidos ip ON ipm.item_pedido_id = ip.id
            INNER JOIN pedidos p ON ip.id_pedido = p.id
            INNER JOIN clientes c ON p.cliente_id = c.id
            WHERE ip.id = :item_id;
        `,{
            replacements: {item_id:item_id},
            type: QueryTypes.SELECT,
            plain: true
        })
        
        return dados
    }

    async cadastrar(dados){
        try {
            const handler = this.obterHandler(dados)
            const dadosQuantidade = parseInt(dados.quantidade)
            const itemPedido = await serviceItemPedido.buscaritem(dados.item_pedido_id)

            // validação da quantidade
            const total = itemPedido.quantidade
            const totalItemMedida = await this.somar_quantidadeMedida_registrada(dados.item_pedido_id)
            if(dadosQuantidade>total || ((totalItemMedida+dadosQuantidade)>total) || dadosQuantidade<1 || isNaN(dadosQuantidade)){
                throw new Error('Quantidade inválida!')
                
            }

            let medida = {}
            medida = dados.medidas[0]
            const item_com_mesma_medida = await this.buscarPorMedidasDoMesmoItem_ComMesmaMedida(dados.item_pedido_id,medida,dados.tipo_medida)
            let valorbool = item_com_mesma_medida?'1':null
            if(valorbool){
                const quantidade_Antiga = parseInt(item_com_mesma_medida.quantidade)
                let novaquantidade = dadosQuantidade+quantidade_Antiga
                let updateQuantidade = await this.editar_quantidade(novaquantidade,item_com_mesma_medida.id)
                return updateQuantidade
            }else{
                // cadastro do item pedido medida
                const cadastro = await sequelize.transaction(async(t)=>{
                    const item_medida = await modelItemPedidoMedida.create({
                        item_pedido_id:dados.item_pedido_id,
                        tipo_medida:dados.tipo_medida,
                        quantidade:dadosQuantidade
                    },{transaction:t})

                    medida.item_medida_id = item_medida.id
                    medida.transacao = t
                    const cadastro_medida = await handler.cadastrar(medida)
                    return {medida:item_medida}
                })
                return cadastro
            }

        } catch (error) {
            throw new Error(`${error.message}`)
        }
    }

    async dados_formulario_atualizar(medida_id){
        let dados = await sequelize.query(`
            WITH TotalUsado AS(
                SELECT
                    item_pedido_id,
                    COALESCE(SUM(quantidade),0) AS quantidade_usada
                FROM item_pedido_medidas
                GROUP BY item_pedido_id
            )
            SELECT
                c.nome AS nome_cliente,
                p.id AS pedido_id,
                ip.produto AS produto,
                ip.modelo_produto AS modelo,
                ip.cor AS cor,
                ip.id AS item_id,
                ipm.tipo_medida AS tipo_medida,
                ipm.id AS vinculo_medida_id,
                ip.quantidade - COALESCE(SUM(t.quantidade_usada),0) + ipm.quantidade AS quantidade_disponivel,
                ipm.quantidade AS quantidade_medida,
                CASE 
                    WHEN ipm.tipo_medida = 'padrao' THEN 
                        json_object(
                            'sexo',mp.sexo,
                            'tamanho',mp.tamanho,
                            'ajuste',mp.ajuste
                        )
                    WHEN ipm.tipo_medida = 'sob_medida' THEN
                        json_object(
                            'sexo',msm.sexo,
                            'busto',msm.busto,
                            'cintura',msm.cintura,
                            'quadril',msm.quadril,
                            'comprimento',msm.comprimento,
                            'ombro',msm.ombro,
                            'costas',msm.costas,
                            'comprimento_da_manga',msm.comprimento_da_manga,
                            'largura_da_manga',msm.largura_da_manga
                        ) 
                END AS medidas
                FROM item_pedido_medidas ipm
                    LEFT JOIN medidas_padrao mp ON mp.item_pedido_medida_id = ipm.id
                    LEFT JOIN medidas_sob_medidas msm ON msm.item_pedido_medida_id = ipm.id
                    INNER JOIN itens_pedidos ip ON ipm.item_pedido_id = ip.id
                    INNER JOIN TotalUsado t ON t.item_pedido_id = ip.id
                    INNER JOIN pedidos p ON ip.id_pedido = p.id
                    INNER JOIN clientes c ON p.cliente_id = c.id
                WHERE 
                    (ipm.tipo_medida = 'padrao' AND mp.id = :id)
                    OR
                    (ipm.tipo_medida = 'sob_medida' AND msm.id = :id)`,
        {
            replacements: {id:medida_id},
            type: QueryTypes.SELECT,
            plain: true
        })

        dados.medidas = JSON.parse(dados.medidas)
        return dados
    }

    async atualizar(dados){
        try {
            const handler = this.obterHandler(dados)
            const dadosQuantidade = parseInt(dados.quantidade)
            const vinculo_medida = await this.buscar(dados.item_pedido_medida_id)
            if(!vinculo_medida){
                throw new Error('Falha ao encontrar Medida!')
            }
            if(vinculo_medida.tipo_medida != dados.tipo_medida){
                throw new Error('Tipo De Medida Inválido!')
            }
            const itemPedido = await serviceItemPedido.buscaritem(vinculo_medida.item_pedido_id)

            // validação da quantidade
            const total = itemPedido.quantidade
            const totalItemMedida = (await this.somar_quantidadeMedida_registrada(vinculo_medida.item_pedido_id)) - parseInt(vinculo_medida.quantidade)
            if(dadosQuantidade>total || ((totalItemMedida+dadosQuantidade)>total) || dadosQuantidade<1 || isNaN(dadosQuantidade)){
                throw new Error('Quantidade inválida!')
            }

            const busca_medida = await handler.buscarPorItemPedidoMedidaIdEMedidaId(dados.medida_id,vinculo_medida.id)
            if(!busca_medida){
                throw new Error('Medida Não Encontrada!')
            }
            let medida = {}
            medida = dados.medidas[0]

            const item_com_mesma_medida = await this.buscarPorMedidasDoMesmoItem_ComMesmaMedida(vinculo_medida.item_pedido_id,medida,dados.tipo_medida)
            let valorbool = item_com_mesma_medida?'1':null
            if(valorbool){
                let novaquantidade = dadosQuantidade
                if(item_com_mesma_medida.id != vinculo_medida.id){
                    await this.deletar(vinculo_medida.id)
                    const quantidade_Antiga = parseInt(item_com_mesma_medida.quantidade)
                    novaquantidade=dadosQuantidade+quantidade_Antiga
                }
                let updateQuantidade = await this.editar_quantidade(novaquantidade,item_com_mesma_medida.id)
                return updateQuantidade
            }else{
                // cadastro do item pedido medida
                const atualizacao = await sequelize.transaction(async(t)=>{
                    await vinculo_medida.update({
                        quantidade:dadosQuantidade
                    },{transaction:t})

                    medida.medida_id = dados.medida_id
                    medida.transacao = t
                    medida.item_medida_id = vinculo_medida.id
                    const atualizar_medida = await handler.atualizar(medida)
                    return {medida:vinculo_medida}
                })
                return atualizacao
            }

        } catch (error) {
            throw new Error(`${error.message}`)
        }
    }

    async deletar(id){
        const vinculo_medida = await modelItemPedidoMedida.findOne({where:{id:id}})
        if(!vinculo_medida){
            throw new Error('Vinculo Não encontrado!')
        }
        return await vinculo_medida.destroy()
    }

    async editar_quantidade(quantidade, id){
        const updateQuantidade = await modelItemPedidoMedida.update({
            quantidade:quantidade
            },{
                where:{id:id}
            }
        )
        return updateQuantidade
    }

    async somar_quantidadeMedida_registrada(item_pedido_id){
        const total = 0
        const item = await this.buscarPorItemPedidoId(item_pedido_id)
        if(!item){
            return total
        }
        const totaldb = await modelItemPedidoMedida.sum('quantidade',{where:{item_pedido_id:item_pedido_id}})
        return totaldb
    }

    // consulta para procurar mesmo tamanho padrao para o mesmo item
    async buscarPorMedidasDoMesmoItem_ComMesmaMedida(id,medida,tipo){
        const [model,dados,alias] = this.obterModel(tipo,medida)
        const consulta = await modelItemPedidoMedida.findOne({
            where:{
                item_pedido_id:id
            },attibutes:['id','quantidade'],
            include:[{
                model:model,
                as: alias,
                required: true,
                where:dados
                }]
            })
        return consulta
    }
}

module.exports = new ItemPedidoMedida()
